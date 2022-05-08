"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createNewFeatureRequest = exports.getAllUserFeatureRequests = exports.getAllCompanyFeatureRequests = exports.getAllFeatureRequests = exports.GET_ALL_USER_FEATURE_REQUESTS = exports.GET_ALL_COMPANY_FEATURE_REQUESTS = exports.GET_ALL_FEATURE_REQUESTS = void 0;
var axios_1 = __importDefault(require("axios"));
exports.GET_ALL_FEATURE_REQUESTS = "GET_ALL_FEATURE_REQUESTS";
exports.GET_ALL_COMPANY_FEATURE_REQUESTS = "GET_ALL_COMPANY_FEATURE_REQUESTS";
exports.GET_ALL_USER_FEATURE_REQUESTS = "GET_ALL_USER_FEATURE_REQUESTS";
var getAllFeatureRequests = function () {
    return function (dispatch) {
        return axios_1["default"]
            .get("http://localhost:5000/feature-request/get/all", { withCredentials: true })
            .then(function (res) {
            dispatch({ type: exports.GET_ALL_FEATURE_REQUESTS, payload: res.data });
        })["catch"](function (error) { return console.log(error); });
    };
};
exports.getAllFeatureRequests = getAllFeatureRequests;
var getAllCompanyFeatureRequests = function () {
    return function (dispatch) {
        return axios_1["default"]
            .get("http://localhost:5000/feature-request/get/all-company", { withCredentials: true })
            .then(function (res) {
            dispatch({ type: exports.GET_ALL_COMPANY_FEATURE_REQUESTS, payload: res.data });
        })["catch"](function (error) { return console.log(error); });
    };
};
exports.getAllCompanyFeatureRequests = getAllCompanyFeatureRequests;
var getAllUserFeatureRequests = function () {
    return function (dispatch) {
        return axios_1["default"]
            .get("http://localhost:5000/feature-request/get/all-user", { withCredentials: true })
            .then(function (res) {
            dispatch({ type: exports.GET_ALL_USER_FEATURE_REQUESTS, payload: res.data });
        })["catch"](function (error) { return console.log(error); });
    };
};
exports.getAllUserFeatureRequests = getAllUserFeatureRequests;
var createNewFeatureRequest = function (title, details, creatorType, status) {
    return function (dispatch) {
        return axios_1["default"]
            .post("http://localhost:5000/feature-request/create", { title: title, details: details, creatorType: creatorType, status: status })
            .then(function (res) { return console.log(res); });
    };
};
exports.createNewFeatureRequest = createNewFeatureRequest;
