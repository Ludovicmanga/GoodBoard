"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Default = void 0;
var MainNavBar_1 = __importDefault(require("./MainNavBar"));
var react_1 = __importDefault(require("react"));
exports["default"] = {
    title: "UI/Navbar",
    component: MainNavBar_1["default"]
};
var Default = function () { return (react_1["default"].createElement(MainNavBar_1["default"], null)); };
exports.Default = Default;
