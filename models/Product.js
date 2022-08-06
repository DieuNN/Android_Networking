const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema({
        name: String,
        type: String,
        price: String,
        description: String,
        imageLink: String
    },
    {timestamps: true}
)

module.exports = mongoose.model("Product", Product)
