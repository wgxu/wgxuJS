var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session= require('express-session');

//router
var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var out = require('./routes/out');
var course = require('./routes/course');
var question = require('./routes/question');
var share = require('./routes/share');
var coursedetail = require('./routes/coursedetail');
var quesdetail = require('./routes/quesdetail');
var sharedetail = require('./routes/sharedetail');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('env','production');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//设置全局cookie
app.use(cookieParser());
//设置全局session
app.use(session({
  secret: 'wgxudemo',
  cookie: {maxAge: 30*60*1000},
  resave: false,
  rolling:true,
  saveUninitialized: true
}));
//设置静态服务器
app.use(express.static(path.join(__dirname, 'public')));

//use 
app.use('/', routes);
app.use('/users', users);
app.use('/login',login);
app.use('/out',out);
app.use('/course',course);
app.use('/question',question);
app.use('/share',share);
app.use('/coursedetail',coursedetail);
app.use('/quesdetail',quesdetail);
app.use('/sharedetail',sharedetail);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
