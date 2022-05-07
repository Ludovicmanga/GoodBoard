"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getUser = exports.GET_USER = void 0;
var axios_1 = __importDefault(require("axios"));
exports.GET_USER = "GET_USER";
var getUser = function (userId) {
    return function (dispatch) {
        return axios_1["default"]
            .get("http://localhost:5000/users/get/".concat(userId), { withCredentials: true })
            .then(function (res) {
            dispatch({ type: exports.GET_USER, payload: res.data });
        })["catch"](function (error) { return console.log(error); });
    };
};
exports.getUser = getUser;
