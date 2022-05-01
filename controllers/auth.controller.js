"use strict";
var userModel = require('../models/user.model');
var jwt = require('jsonwebtoken');
var _a = require('../utils/errors.utils'), signUpErrors = _a.signUpErrors, loginErrors = _a.loginErrors;
module.exports.signUp = function (req, res) {
    var _a = req.body, pseudo = _a.pseudo, email = _a.email, password = _a.password, type = _a.type;
    var user = new userModel({ pseudo: pseudo, email: email, password: password, type: type });
    user.save()
        .then(function (user) { return res.status(201).json({ user: user._id }); })["catch"](function (error) {
        var formattedErrors = signUpErrors(error);
        res.status(200).json(formattedErrors);
    });
};
module.exports.login = function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    var user = userModel.login(email, password);
};
module.exports.logout = function (req, res) {
};
