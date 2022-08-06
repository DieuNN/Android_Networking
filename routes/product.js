var express = require('express');
var router = express.Router();
var Product = require('../models/Product')

router.post("/product/add",async (req, res) => {
    const {name, price, type, description, imageLink} = req.body
    const newProduct = new Product({
        name : name,
        price: price,
        type : type,
        description : description,
        imageLink : imageLink
    })
    newProduct.save((error, result) => {
        if (error) {
            res.end(error.toString())
        }
        res.end(result.toString())
    })
})

router.get("/products", async (req, res) =>{
    Product.find({}).sort({"createAt":'desc'}).exec((error, result) => {
        if (error) {
            res.end(error.toString())
        }
        res.json(result)
    })
})

// get product by id
router.get("/products/get/:id", (req, res) => {
    Product.find({_id : req.params.id}, (error, result) => {
        if (error) {
            res.end(error.toString())
        }
        res.json(result)
    })
})

module.exports = router
