var express = require('express');
var router = express.Router();
var Guest = require('../models/Guest')


/* GET users listing. */
router.get('/guest', function (req, res, next) {
    Guest.find((error, result) => {
        if (error) throw error
        res.setHeader("Content-Type", "application/json")
        res.json(result)
    })
})

router.get('/guest/get/:id', (req, res) => {
    const id = req.params.id

    Guest.findOne({_id: id}, (error, result) => {
        if (error) {
            res.end("Guest not found!")
        }
        else {
            res.json(result)
        }
    })
})

router.get('/guest/add/', (req, res) => {
    const {first_name, last_name, email} = req.query
    const newGuest = new Guest({
        firstName: first_name,
        lastName: last_name,
        email: email
    })


    if ((first_name === undefined) ||
        (last_name === undefined) ||
        (email === undefined)
    ) {
        res.end("No data to insert")
        return
    }

    newGuest.save(error => {
        if (error) {
            res.end(error)
        }
        console.log("Saved")
    })
    res.end("Data inserted")
})

router.get('/guest/edit/:id', (req, res) => {
    const {first_name, last_name, email} = req.query
    const id = req.params.id

    if ((first_name === undefined) ||
        (last_name === undefined) ||
        (email === undefined)
    ) {
        res.end("No data to update")
        return
    }

    Guest.findOneAndUpdate({_id: id}, {
        firstName: first_name,
        lastName: last_name,
        email: email
    }, {}, err => {
        if (err) {
            res.end(err)
        }
        res.end("Updated")
    })
})

router.get('/guest/delete/:id', (req, res) => {
    const id = req.params.id

    Guest.findOneAndDelete({_id: id}, {}, err => {
        if (err) {
            res.end("Guest not found!")
        }
        res.end("Deleted")
    })
})


module.exports = router;
