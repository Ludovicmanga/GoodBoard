"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.FeatureRequestsContainer = void 0;
var react_1 = __importDefault(require("react"));
var FeatureRequestsBox_1 = require("../FeatureRequestsBox/FeatureRequestsBox");
var FeatureRequestsContainer = function (_a) {
    var requestAuthorType = _a.requestAuthorType;
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
