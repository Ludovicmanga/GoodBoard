"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var material_1 = require("@mui/material");
var react_1 = __importDefault(require("react"));
var MainHero_module_scss_1 = __importDefault(require("./MainHero.module.scss"));
var asian_girl_jpg_1 = __importDefault(require("../../photos/asian_girl.jpg"));
var MainHero = function (props) {
    return (react_1["default"].createElement("div", { className: MainHero_module_scss_1["default"].container },
        react_1["default"].createElement(material_1.Avatar, { alt: "Company logo pic", src: asian_girl_jpg_1["default"] }),
        react_1["default"].createElement("div", { className: MainHero_module_scss_1["default"].text }, "Nom de l'entreprise"),
        react_1["default"].createElement("div", { className: MainHero_module_scss_1["default"].text }, "D\u00E9scription de l'entreprise")));
};
exports["default"] = MainHero;
