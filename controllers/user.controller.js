"use strict";
exports.__esModule = true;
var ObjectId = require('mongoose').Types.ObjectId;
var userModel = require('../models/user.model');
module.exports.getUser = function (req, res) {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown ' + req.params.id);
    userModel.findById(req.params.id).select('-password')
        .then(function (user) { return res.status(200).send(user); })["catch"](function (error) { return res.status(200).send(error); });
};
