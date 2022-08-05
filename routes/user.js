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
            products: null
        })
        newUser.save((error1, result1) => {
            if (error1) {
                res.end(error1)
            }
            res.end("Đăng ký tài khoản thành công")
        })
    })
})

router.get("/user/get", (req, res) => {
    User.find({username : req.params.username}).limit(1).exec((error, result) => {
        if (error) {
            res.end(error)
        }
        res.end(result)
    })
})




module.exports = router;
