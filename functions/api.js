const express = require('express')
const serverless = require('serverless-http')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const router = express.Router()
const Lottoinfo = require('../models/lottonumbers')

dotenv.config()
const MONGOURL = process.env.MONGO_URL

mongoose.connect(MONGOURL).then(()=> {
    console.log('data connected')

    // const lottoData = Lottoinfo.find().then((data)=> {
    //     console.log(data)
    // })
}).catch((error)=> console.log(error))



router.get('/', async(req, res) => {
    res.send('App is running...')
})

router.get('/getLottoData', async(req, res) => {
    const lottoData = await Lottoinfo.find();
    res.json(lottoData)
})

router.post('/add', async(req,res) => {
    const lottonumber = new Lottoinfo({
        date: req.body.date,
        numbers: req.body.numbers
    })

    lottonumber.save().then(()=>{
        res.send('saved')
    }).catch((error)=> {console.log(error)})

})


router.delete('/', (req,res) => {
    res.send('Deleted record')
})

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app)