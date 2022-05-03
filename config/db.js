"use strict";
var mongoose = require("mongoose");
mongoose
    .connect("mongodb+srv://ludovicmangaj:".concat(process.env.DB_USER_PASSWORD, "@cluster0.fhytx.mongodb.net/goodboard"))
    .then(function () {
    console.log('connected to MongoDB !!');
})["catch"](function (error) { return console.log('Failed to connect to MongoDB', error); });
