"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Default = void 0;
var SignInPage_1 = __importDefault(require("./SignInPage"));
var react_1 = __importDefault(require("react"));
exports["default"] = {
    title: "UI/Sign In Page",
    component: SignInPage_1["default"]
};
var Default = function () { return (react_1["default"].createElement(SignInPage_1["default"], null)); };
exports.Default = Default;
