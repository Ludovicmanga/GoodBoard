"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var axios_1 = __importDefault(require("axios"));
exports["default"] = axios_1["default"].create({
    baseURL: "http://localhost:5000/users/login"
});
