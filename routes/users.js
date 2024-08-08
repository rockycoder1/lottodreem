const express = require('express')
const router = express.Router()

const usersDB = {
    users: require('../models/user.js'),
    setUsers: function (data) {this.user = data}
}

//GET ALL USERS
router.get('/getusers', async (req,res)=> {
    
    try {
        const allUsers = await usersDB.users.find({});
        console.log('update')
        res.send(allUsers)

    } catch (err){
        res.status(500).json({'message': err.message})
    }

});

module.exports = router;