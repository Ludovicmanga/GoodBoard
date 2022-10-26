"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_router_dom_1 = require("react-router-dom");
var react_1 = __importDefault(require("react"));
var Login_1 = __importDefault(require("../components/Login/Login"));
var MainHero_1 = __importDefault(require("../components/MainHero/MainHero"));
var MainNavBar_1 = __importDefault(require("../components/MainNavBar/MainNavBar"));
var MenuChoiceNavBar_1 = __importDefault(require("../components/MenuChoiceNavBar/MenuChoiceNavBar"));
var FeatureRequests_1 = __importDefault(require("../pages/FeatureRequests/FeatureRequests"));
var index_module_scss_1 = __importDefault(require("./index.module.scss"));
var Roadmap_1 = __importDefault(require("../pages/Roadmap/Roadmap"));
function index() {
    return (react_1["default"].createElement("div", { className: index_module_scss_1["default"].superContainer },
        react_1["default"].createElement("div", { className: index_module_scss_1["default"].container },
            react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
                react_1["default"].createElement(MainNavBar_1["default"], null),
                react_1["default"].createElement(MainHero_1["default"], null),
                react_1["default"].createElement(MenuChoiceNavBar_1["default"], null),
                react_1["default"].createElement(react_router_dom_1.Routes, null,
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/", element: react_1["default"].createElement(FeatureRequests_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/roadmap", element: react_1["default"].createElement(Roadmap_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/login", element: react_1["default"].createElement(Login_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "*", element: react_1["default"].createElement(react_router_dom_1.Navigate, { to: "/", replace: true }) }))))));
}
exports["default"] = index;
