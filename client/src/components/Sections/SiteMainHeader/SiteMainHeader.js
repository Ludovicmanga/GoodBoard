"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var MainHero_1 = __importDefault(require("../../MainHero/MainHero"));
var MainNavBar_1 = __importDefault(require("../../MainNavBar/MainNavBar"));
var MenuChoiceNavBar_1 = __importDefault(require("../../MenuChoiceNavBar/MenuChoiceNavBar"));
var SiteMainHeader = function (props) {
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(MainNavBar_1["default"], null),
        react_1["default"].createElement(MainHero_1["default"], null),
        react_1["default"].createElement(MenuChoiceNavBar_1["default"], null)));
};
exports["default"] = SiteMainHeader;
