"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var NewFeatureRequestsButton_1 = __importDefault(require("../../components/buttons/NewFeatureRequestButton/NewFeatureRequestsButton"));
var react_1 = __importDefault(require("react"));
var FeatureRequests = function (props) {
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", null),
        react_1["default"].createElement(NewFeatureRequestsButton_1["default"], null)));
};
exports["default"] = FeatureRequests;
