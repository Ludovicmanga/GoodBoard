"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Default = void 0;
var MenuChoiceModal_1 = require("./MenuChoiceModal");
var react_1 = __importDefault(require("react"));
exports["default"] = {
    title: 'UI/MenuChoiceModal',
    component: MenuChoiceModal_1.MenuChoiceModal
};
var Default = function () {
    return react_1["default"].createElement(MenuChoiceModal_1.MenuChoiceModal, null);
};
exports.Default = Default;
