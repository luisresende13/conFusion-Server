//Default Requirements...
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var express = require('express');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

//Default Routers...
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//Custom Routers...
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');
var favoriteRouter = require('./routes/favoriteRouter');
const uploadRouter = require('./routes/uploadRouter');

//Mongoose...
const mongoose = require('mongoose');
//Databases...
const Dishes = require('./models/dishes')
const User = require('./models/user')
//Passport...
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');


/*  -------------- Mongoose Database Connection ---------------- */

//Database Connection...
const url = config.mongoUrl;
const connect = mongoose.connect(url);
//Connection Error Handler...
connect.then((db) => {
    console.log("Connected correctly to server");
    //console.log(db)
}, (err) => { console.log(err); });

/*  ---------------- App Body Setting---------------------  */

var app = express();

/*  ------------------- Security management ------------- */

// Secure traffic only
app.all('*', (req, res, next) => {
  if (req.secure) {
    return next();
  }
  else {
  	console.log('Redirecting Server...')
    res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
  }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*  ------------- Authentication -----------------  */

app.use(cookieParser('12345-67890-09876-54321'));

app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));

/*  ----------- Routers and Authentication ---------------------------  */

app.use(passport.initialize());
app.use(passport.session());

//Custom Routers...
app.use('/', indexRouter);
app.use('/users', usersRouter);

/*
function auth (req, res, next) {
    console.log(req.user);

    if (!req.user) {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      next(err);
    }
    else {
          next();
    }
}

app.use(auth);
*/

//Static Router at 'public' folder...
app.use(express.static(path.join(__dirname, 'public')));
//Database Routers...
app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);
app.use('/favorites', favoriteRouter)
app.use('/imageUpload',uploadRouter);

/*  ------------------- Error Handling -----------------------  */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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

