const express = require('express')
const serverless = require('serverless-http')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const router = express.Router()

dotenv.config()
const MONGOURL = process.env.MONGO_URL

let testMongo = 'hi'

mongoose.connect(MONGOURL).then(()=> {
    console.log('data connected')
    testMongo = 'this worked'
    //Get
    router.get('/', (req, res) => {
        res.send('App is running...' + testMongo)
    })
}).catch((error)=> console.log(error))



router.post('/add', (req,res) => {
    res.send('New record added')
})


router.delete('/', (req,res) => {
    res.send('Deleted record')
})

// console.log('hi', MONGOURL)

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app)