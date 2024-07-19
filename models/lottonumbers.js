const mongoose = require('mongoose')

const lottoNumberSchema = new mongoose.Schema({
    date: String,
    numbers: String
});

module.exports = mongoose.model("LottoNumber", lottoNumberSchema)