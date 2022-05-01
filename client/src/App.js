"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var RouterIndex_1 = __importDefault(require("./components/Routes/RouterIndex"));
var react_1 = __importDefault(require("react"));
var App = function () {
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(RouterIndex_1["default"], null)));
};
exports["default"] = App;
