const mongoose = require('mongoose')

const newUserSchema = new mongoose.Schema({
    username: String,
    pwd: String
});

module.exports = mongoose.model("NewUser", newUserSchema)