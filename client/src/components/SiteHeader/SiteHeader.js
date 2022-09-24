"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var Hero_1 = __importDefault(require("../Hero/Hero"));
var MainNavBar_1 = __importDefault(require("../MainNavBar"));
var SiteHeader = function (props) {
    return (react_1["default"].createElement("div", { className: 'siteHeader' },
        react_1["default"].createElement(MainNavBar_1["default"], null),
        react_1["default"].createElement(Hero_1["default"], null)));
};
exports["default"] = SiteHeader;
