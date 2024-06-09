var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var layouts = require('express-ejs-layouts');

const mariadb = require('mariadb/callback');
const dotenv = require('dotenv');

dotenv.config();
const db = mariadb.createConnection({host: process.env.DB_HOST,
                                    user: process.env.DB_USER,
                                    password: process.env.DB_PASSWORD,
                                    database: process.env.DB_DATABASE,
                                    port: process.env.DB_PORT});
// connect to database
db.connect((err) => {
  if (err) {
    console.log("Unable to connect to database due to error: " + err);
res.render('error');
  } else {
    console.log("Connected to DB");
}
});
global.db = db;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var privacyRouter = require('./routes/privacy');
var helpRouter = require('./routes/help');
var productRouter = require('./routes/product');
var customerRouter = require('./routes/customer');
var order_detailRouter = require('./routes/order_detail');
var order_itemsRouter = require('./routes/order_items');
var brandRouter = require('./routes/brand');
var categoryRouter = require('./routes/category');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(layouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/help', helpRouter);
app.use('/privacy', privacyRouter);
app.use('/product', productRouter);
app.use('/customer', customerRouter);
app.use('/order_detail', order_detailRouter);
app.use('/order_items', order_itemsRouter);
app.use('/brand', brandRouter);
app.use('/category', categoryRouter);


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
