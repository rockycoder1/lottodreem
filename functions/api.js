const express = require('express')
const serverless = require('serverless-http')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const router = express.Router()
const Lottoinfo = require('../models/lottonumbers')


app.use(express.urlencoded({extended:true}))
app.use(express.json())

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

router.post('/add', (req,res) => {
   
   console.log(req.body)
    const lottonumber = new Lottoinfo({
        date: "from node",
        numbers: "number from node"
    })

    lottonumber.save()

    res.send(req.body)    

})


router.delete('/', (req,res) => {
    res.send('Deleted record')
})

app.use('/.netlify/functions/api', router);

// app.listen(3000, () => console.log('Server running on port 3000!'))

module.exports.handler = serverless(app)