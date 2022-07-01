const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema({
        name: String,
        price: Number,
        description: String,
    },
    {timestamps: true}
)

module.exports = mongoose.model("Product", Product)
