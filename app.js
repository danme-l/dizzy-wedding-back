var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

// route handlers
var indexRouter = require('./routes/index');
var guestsRouter = require('./routes/guests');
var passwordsRouter = require('./routes/passwords');

// init express app instance
var app = express();
app.use(cors());


// jade view engine setup. info:
// https://github.com/dscape/jade
// won't actually do anything for the final app but helps us for dev/debug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middleware
app.use(logger('dev')); // log requests in dev mode
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public')));

// define the routes 
app.use('/', indexRouter);
app.use('/guests', guestsRouter);
app.use('/passwords', passwordsRouter);

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
