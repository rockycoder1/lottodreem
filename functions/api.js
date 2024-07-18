const express = require('express')
const serverless = require('serverless-http')
const app = express()
const router = express.Router()

let records = []

//Get
router.get('/', (req, res) => {
    res.send('App is running...')
})

router.post('/add', (req,res) => {
    res.send('New record added')
})


router.delete('/', (req,res) => {
    res.send('Deleted record')
})

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app)