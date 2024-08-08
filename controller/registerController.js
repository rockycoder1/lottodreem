const usersDB = {
    users: require('../models/user.js'),
    setUsers: function (data) {this.user = data}
}

const bcrypt = require('bcrypt')

const handleNewUser = async (req,res) => {
    const { user,pwd} = req.body
    // console.log(req.body)
    // res.send(req.body)

    if(!user || !pwd) {
        return res.status(400).json({'message': 'Username and password required'})
    }

    // check for duplicate LINK MONGO
    const duplicate = await usersDB.users.find({username:user});

    if(duplicate.length !== 0) {
        return res.sendStatus(409)
    } else {
        try {
            const hashedPwd = await bcrypt.hash(pwd, 10);
            const newUser = new usersDB.users({"username": user, "pwd": hashedPwd})
            // usersDB.setUsers([...usersDB.users, newUser])// MONGO SAVE
            //save user to db
            newUser.save()

            //if success
            return res.status(201).json({'success': 'New user added'})

        } catch (err){
            return res.status(500).json({'message': err.message})
        }
    }
}

module.exports = { handleNewUser}