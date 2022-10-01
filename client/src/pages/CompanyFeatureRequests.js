"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var FeatureRequestsContainer_1 = require("../components/FeatureRequest/FeatureRequestContainer/FeatureRequestsContainer");
var react_1 = __importDefault(require("react"));
var CompanyFeatureRequests = function (props) {
    return (react_1["default"].createElement(FeatureRequestsContainer_1.FeatureRequestsContainer, { requestAuthorType: 'admin' }));
};
exports["default"] = CompanyFeatureRequests;
