var express = require('express');
var router = express.Router();
var Product = require('../models/Product')

router.get('/product', (req, res) => {
    Product.find((error, result) => {
        if (error) throw error
        res.setHeader("Content-Type", "application/json")
        res.json(result)
    })
})

router.get('/product/get/:id', (req, res) => {
    const id = req.params.id
    Product.findById(id, {}, {}, (error, result) => {
        if (error) throw error
        res.json(result)
    })
})

router.get('/product/add', (req, res) => {
    const name = req.query.name
    const price = req.query.price
    const description = req.query.description


    if (
        name === undefined ||
        price === undefined ||
        description === undefined
    ) {
        res.end("Check your data")
        return
    }

    const newProduct = new Product({
        name: name,
        price: price,
        description: description,
    })

    newProduct.save(error => {
        if (error) throw error
        res.end("Added")
    })
})

router.get('/product/edit/:id', (req, res) => {
    const id = req.params.id

    Product.findOneAndUpdate({_id: id}, {
        name: req.query.name,
        price: req.query.price,
        description: req.query.description
    }, {}, (err, doc) => {
        if (err) throw err
        else res.end("Edited")
    })

})

router.get('/product/delete/:id', (req, res) => {
    const id = req.params.id

    Product.findOneAndDelete({_id: id}, {}, err => {
        if (err) throw err
        res.end("Deleted")
    })
})

module.exports = router
