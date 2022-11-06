"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.DBConnection = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.DBConnection = mongoose_1["default"]
    .connect("mongodb+srv://ludovicmangaj:M433c'm442B@cluster0.fhytx.mongodb.net/goodboard")
    .then(function () {
    console.log('connected to MongoDB !!');
})["catch"](function (error) { return console.log('Failed to connect to MongoDB', error); });
