var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors = require('cors');
// var session = require('client-sessions');
var expressSession = require('express-session');

var app = express();
app.use(cors());


//sessions
app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// DataBase 
var mysql = require('mysql');

var con = mysql.createConnection({
    // host: "localhost",
    // user: "root",
    // password: "shicanjie0127",
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
    database: "rds"
    // socketPath: '/tmp/mysql.sock'
});

con.connect(function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('connecting success');
});

// db state
app.use(function(req, res, next) {
  req.con = con;
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


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
