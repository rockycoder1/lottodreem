const express = require('express')
const serverless = require('serverless-http')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const router = express.Router()

dotenv.config()
const MONGOURL = process.env.MONGO_URL

let testMongo = ''

mongoose.connect(MONGOURL).then(()=> {
    console.log('data connected')
    testMongo = 'this worked'
}).catch((error)=> console.log(error))

//Get
router.get('/', (req, res) => {
    res.send('App is running...' + testMongo)
})

router.post('/add', (req,res) => {
    res.send('New record added')
})


router.delete('/', (req,res) => {
    res.send('Deleted record')
})

// console.log('hi', MONGOURL)

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app)