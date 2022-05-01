"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Default = void 0;
var react_1 = __importDefault(require("react"));
var FeatureRequestsContainer_1 = require("./FeatureRequestsContainer");
exports["default"] = {
    title: "UI/Feature requests container",
    component: FeatureRequestsContainer_1.FeatureRequestsContainer
};
var Default = function () { return (react_1["default"].createElement(FeatureRequestsContainer_1.FeatureRequestsContainer, { requestAuthorType: "user" })); };
exports.Default = Default;
