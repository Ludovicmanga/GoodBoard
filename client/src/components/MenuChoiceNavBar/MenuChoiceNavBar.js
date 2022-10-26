"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var MenuChoiceNavBar_module_scss_1 = __importDefault(require("./MenuChoiceNavBar.module.scss"));
var material_1 = require("@mui/material");
var react_router_dom_1 = require("react-router-dom");
var MenuChoiceNavBar = function (props) {
    return (react_1["default"].createElement("div", { className: MenuChoiceNavBar_module_scss_1["default"].container },
        react_1["default"].createElement("div", { className: MenuChoiceNavBar_module_scss_1["default"].buttonContainer },
            react_1["default"].createElement(react_router_dom_1.NavLink, { to: '/' },
                react_1["default"].createElement(material_1.Button, { className: MenuChoiceNavBar_module_scss_1["default"].button, variant: "contained" },
                    react_1["default"].createElement("div", { className: MenuChoiceNavBar_module_scss_1["default"].btnText }, "Vos id\u00E9es")))),
        react_1["default"].createElement("div", { className: MenuChoiceNavBar_module_scss_1["default"].buttonContainer },
            react_1["default"].createElement(react_router_dom_1.NavLink, { to: '/' },
                react_1["default"].createElement(material_1.Button, { className: MenuChoiceNavBar_module_scss_1["default"].button, variant: "contained" },
                    react_1["default"].createElement("div", { className: MenuChoiceNavBar_module_scss_1["default"].btnText }, "Nos id\u00E9es")))),
        react_1["default"].createElement("div", { className: MenuChoiceNavBar_module_scss_1["default"].buttonContainer },
            react_1["default"].createElement(react_router_dom_1.NavLink, { to: '/roadmap' },
                react_1["default"].createElement(material_1.Button, { className: MenuChoiceNavBar_module_scss_1["default"].button, variant: "contained" },
                    react_1["default"].createElement("div", { className: MenuChoiceNavBar_module_scss_1["default"].btnText }, "Roadmap"))))));
};
exports["default"] = MenuChoiceNavBar;
