"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.FeatureRequestsContainer = void 0;
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var FeatureRequestsBox_1 = require("../FeatureRequestsBox/FeatureRequestsBox");
var FeatureRequestsContainer = function (_a) {
    var requestAuthorType = _a.requestAuthorType;
    var allCompanyFeatureRequests = (0, react_redux_1.useSelector)(function (state) { return state.allCompanyFeatureRequests; });
    var allUserFeatureRequests = (0, react_redux_1.useSelector)(function (state) { return state.allUserFeatureRequests; });
    if (requestAuthorType === 'user') {
        return (react_1["default"].createElement(FeatureRequestsBox_1.FeatureRequestsBox, null));
    }
    else if (requestAuthorType === 'company') {
        return (react_1["default"].createElement(FeatureRequestsBox_1.FeatureRequestsBox, null));
    }
    else
        return (react_1["default"].createElement("div", null, "Problemo"));
};
exports.FeatureRequestsContainer = FeatureRequestsContainer;
