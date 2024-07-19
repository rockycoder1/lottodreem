const express = require('express')
const serverless = require('serverless-http')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const router = express.Router()

dotenv.config()
const MONGOURL = process.env.MONGO_URL



mongoose.connect(MONGOURL).then(()=> {
    console.log('data connected')
}).catch((error)=> console.log(error))

const lottoNumberSchema = new mongoose.Schema({
    date: String,
    numbers: String
});

const Lottoinfo = mongoose.model("LottoNumber", lottoNumberSchema)

const getData = async () => {
    const lottoData = await Lottoinfo.find().then((da)=>{
        console.log('found',da)
    }).catch((error)=> console.log(error));
}

getData()

router.get('/', async(req, res) => {
    
    res.send('App is running...')
})

router.get('/getLottoData', async(req, res) => {
    const lottoData = await Lottoinfo.find();
    console.log(lottoData)
    res.json(lottoData)
})

router.post('/add', (req,res) => {
    res.send('New record added')
})


router.delete('/', (req,res) => {
    res.send('Deleted record')
})

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app)