var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
let productRouter = require('./routes/product')
let squareRouter = require("./routes/square")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(userRouter);
app.use(productRouter)
app.use(squareRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

mongoose.connect("mongodb+srv://dieunn:nongngocdieu@cluster1.fkfat.mongodb.net/?retryWrites=true&w=majority", (err) => {
    if (!err) {
        console.log("Connected")
    }
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
