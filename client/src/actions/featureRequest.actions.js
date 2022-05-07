"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getAllFeatureRequests = exports.GET_ALL_FEATURE_REQUESTS = void 0;
var axios_1 = __importDefault(require("axios"));
exports.GET_ALL_FEATURE_REQUESTS = "GET_ALL_FEATURE_REQUESTS";
var getAllFeatureRequests = function () {
    return function (dispatch) {
        return axios_1["default"]
            .get("http://localhost:5000/feature-request/get/all", { withCredentials: true })
            .then(function (res) {
            console.log(res.data);
            dispatch({ type: exports.GET_ALL_FEATURE_REQUESTS, payload: res.data });
        })["catch"](function (error) { return console.log(error); });
    };
};
exports.getAllFeatureRequests = getAllFeatureRequests;
