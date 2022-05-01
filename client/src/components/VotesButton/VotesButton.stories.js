"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Default = void 0;
var VotesButton_1 = require("./VotesButton");
var react_1 = __importDefault(require("react"));
exports["default"] = {
    title: "UI/Votes",
    component: VotesButton_1.VotesButton
};
var Default = function () {
    return (react_1["default"].createElement(VotesButton_1.VotesButton, null));
};
exports.Default = Default;
