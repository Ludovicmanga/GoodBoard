"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Default = void 0;
var react_1 = __importDefault(require("react"));
var FeatureRequestsBox_1 = require("./FeatureRequestsBox");
exports["default"] = {
    title: "UI/Feature requests Box",
    component: FeatureRequestsBox_1.FeatureRequestsBox
};
var Default = function () { return (react_1["default"].createElement(FeatureRequestsBox_1.FeatureRequestsBox, { title: 'titre', details: '', votes: 2 })); };
exports.Default = Default;
