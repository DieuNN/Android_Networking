var express = require('express');
var router = express.Router();
var User = require('../models/User')
const md5 = require('md5')


router.post("/user/new", async (req, res) => {
    const {username, password} = req.body

    await User.find({username: username}).limit(1).exec((error, result) => {
        if (result.length === 1) {
            res.end("Tên tài khoản đã đuợc sử dụng")
        }
        const newUser = new User({
            username: username,
            password: md5(password),
            products: []
        })
        newUser.save((error1, result1) => {
            if (error1) {
                res.end(error1)
            }
            res.end("Đăng ký tài khoản thành công")
        })
    })
})

router.get("/user/get", async (req, res) => {
    // const hashedPassword = md5(req.params.password)
    await User.find({
        username: req.query.username,
        password: md5(req.query.password)
    }).limit(1).exec((error, result) => {
        if (error) {
            res.end(error)
        }
        res.json(result.length.toString())
    })
})

router.post("/user/put", (req, res) => {
    const {username, productId} = req.body

    User.findOneAndUpdate({username : username}, {
        $addToSet : {
            products : {
                productId : productId
            }
        }
    }, {new : false}, (err, doc) => {
        if (err) {
            res.end(err.toString())
        }
        res.end("ok")
    })
})

// get cart of user
router.get("/user/cart/:username", (req, res) => {
    User.find({username : req.params.username}, {}, {}, (error, result) => {
        if (error) {
            res.end(error.toString())
        }

        res.json(result)
    })
})

// set cart empty
router.post("/user/cart/:username", (req, res) => {
    User.updateOne({username : req.body.username}, {
        $set : {
            products : []
        }
    }, {}, (error, result) => {
        if (error) {
            res.end(error.toString())
        }
        res.end("ok")
    })
})


module.exports = router;
