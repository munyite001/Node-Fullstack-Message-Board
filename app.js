require("dotenv").config()
const MONGODB_URI = process.env.MONGODB_URI;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require("./config/passport")
const flash = require("connect-flash")
const session = require("express-session")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var appRouter = require('./routes/app');

var app = express();

//  Set up a mongoose connection
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoDB = MONGODB_URI;

main().catch((err) => console.log(err))
async function main()
{
  await mongoose.connect(mongoDB)
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//  Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//  session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

// initialize passport and session
app.use(passport.initialize())
app.use(passport.session())

//  use flash
app.use(flash())

// Set up flash messages in response locals so they can be accessed in templates
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success');
  res.locals.error_messages = req.flash('error');
  next();
});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/app', appRouter)

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
