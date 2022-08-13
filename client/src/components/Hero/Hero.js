"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var Hero = function (props) {
    return (react_1["default"].createElement("div", { className: 'hero--container' },
        react_1["default"].createElement("div", { className: 'hero--company-name' }, "Page onze"),
        react_1["default"].createElement("div", { className: 'hero--company-description' }, "Agence web et cr\u00E9ative, \u00E0 destination des TPE / PME")));
};
exports["default"] = Hero;
