const express = require('express')
const router = express.Router()
const registerController = require('../controller/registerController')

router.post('/', registerController.handleNewUser);
router.get('/', (req,res)=> {
    res.send('from register updated')
});

module.exports = router;