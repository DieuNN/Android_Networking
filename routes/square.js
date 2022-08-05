var express = require('express');
var router = express.Router();
var Guest = require('../models/User')


router.get("/square", (req, res) => {
    const edge = req.query.edge

    if (isNaN(edge)) {
        res.end("Edge is not a number!")
    } else {
        res.setHeader("Content-Type", "application/json")
        let result = edge * edge;
        res.end(result.toString())
    }
})

module.exports = router;
