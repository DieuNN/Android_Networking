const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Guest = new Schema({
    firstName:String,
    lastName:String,
    email:String,
})

module.exports = mongoose.model('Guest', Guest)


