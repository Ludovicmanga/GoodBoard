"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Default = void 0;
var MenuChoiceNavBar_1 = require("./MenuChoiceNavBar");
var react_1 = __importDefault(require("react"));
exports["default"] = {
    title: 'UI/MenuChoiceNavBar',
    component: MenuChoiceNavBar_1.MenuChoiceNavBar
};
var Default = function () {
    return react_1["default"].createElement(MenuChoiceNavBar_1.MenuChoiceNavBar, { currentPage: "feature requests" });
};
exports.Default = Default;
