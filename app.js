//Default Requirements...
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Default Routers...
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//Custom Routers...
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');

//Mongoose...
const mongoose = require('mongoose');
//Databases...
const Dishes = require('./models/dishes')
//Database Connection...
const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);
//Connection Error Handler...
connect.then((db) => {
    console.log("Connected correctly to server");
    //console.log(db)
}, (err) => { console.log(err); });


/*  ---------------- App Body ---------------------  */

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Static Router at 'public' folder...
app.use(express.static(path.join(__dirname, 'public')));

//Custom Routers...
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/*  ------------------------------------------  */

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
