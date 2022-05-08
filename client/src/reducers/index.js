"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var redux_1 = require("redux");
var user_reducer_1 = __importDefault(require("./user.reducer"));
var allFeatureRequests_reducer_1 = __importDefault(require("./allFeatureRequests.reducer"));
var allUserFeatureRequests_reducer_1 = __importDefault(require("./allUserFeatureRequests.reducer"));
var allCompanyFeatureRequests_reducer_1 = __importDefault(require("./allCompanyFeatureRequests.reducer"));
exports["default"] = (0, redux_1.combineReducers)({
    userReducer: user_reducer_1["default"],
    allFeatureRequestsReducer: allFeatureRequests_reducer_1["default"],
    allUserFeatureRequestsReducer: allUserFeatureRequests_reducer_1["default"],
    allCompanyFeatureRequestsReducer: allCompanyFeatureRequests_reducer_1["default"]
});
