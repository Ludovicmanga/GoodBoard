"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var redux_1 = require("redux");
var user_reducer_1 = __importDefault(require("./user.reducer"));
var featureRequests_reducer_1 = __importDefault(require("./featureRequests.reducer"));
exports["default"] = (0, redux_1.combineReducers)({
    userReducer: user_reducer_1["default"],
    featureRequestsReducer: featureRequests_reducer_1["default"]
});
