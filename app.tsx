var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var {checkUser, requireAuth} = require('./middleware/auth.middleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var featureRequestRouter = require('./routes/featureRequest');

require('dotenv').config({path: './config/.env'});
require('./config/db.tsx');
const PORT = process.env.PORT || 2000;

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/feature-request', featureRequestRouter);

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
  res.json({ error: err })
});

app.listen(PORT, () => {
  console.log(`le serveur est lancé sur le port ${PORT}`);
})

module.exports = app;