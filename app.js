"use strict";
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var _a = require('./middleware/auth.middleware'), checkUser = _a.checkUser, requireAuth = _a.requireAuth;
require('dotenv').config({ path: './config/.env' });
require('./config/db.ts');
var cors = require('cors');
var corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowed-Headers': ['sessionId', 'Content-type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET, HEAD, PUT, PATCH, DELETE',
    'preflightContinue': false
};
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var featureRequestRouter = require('./routes/featureRequest');
var PORT = process.env.PORT || 2000;
var app = express();
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', checkUser);
app.get('/jwtid', requireAuth, function (req, res) {
    res.status(200).send(res.locals.user._id);
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/feature-request', featureRequestRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
});
app.listen(PORT, function () {
    console.log("le serveur est lanc\u00E9 sur le port ".concat(PORT));
});
module.exports = app;
