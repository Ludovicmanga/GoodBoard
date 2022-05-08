"use strict";
exports.__esModule = true;
var userModel = require('../models/user.model');
var jwt = require('jsonwebtoken');
var _a = require('../utils/errors.utils'), signUpErrors = _a.signUpErrors, loginErrors = _a.loginErrors;
var maxAge = 3 * 24 * 60 * 1000;
var createToken = function (id) {
    return jwt.sign({ id: id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    });
};
module.exports.signUp = function (req, res) {
    var _a = req.body, pseudo = _a.pseudo, email = _a.email, password = _a.password, type = _a.type, isAdmin = _a.isAdmin;
    var user = new userModel({ pseudo: pseudo, email: email, password: password, type: type, isAdmin: isAdmin });
    user.save()
        .then(function (user) { return res.status(201).json({ user: user._id }); })["catch"](function (error) {
        var formattedErrors = signUpErrors(error);
        res.status(200).json(error);
    });
};
module.exports.login = function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    var user = userModel.login(email, password)
        .then(function (user) {
        var token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
        res.status(200).json({ user: user._id });
    })["catch"](function (error) {
        var formattedErrors = loginErrors(error);
        res.status(200).json({ formattedErrors: formattedErrors });
    });
};
module.exports.logout = function (req, res) {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
};
