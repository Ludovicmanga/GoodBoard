"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_router_dom_1 = require("react-router-dom");
var react_1 = __importDefault(require("react"));
var FeatureRequests_1 = __importDefault(require("../pages/FeatureRequests/FeatureRequests"));
var index_module_scss_1 = __importDefault(require("./index.module.scss"));
var Roadmap_1 = __importDefault(require("../pages/Roadmap/Roadmap"));
var types_1 = require("../helpers/types");
var Login_1 = __importDefault(require("../components/Login/Login"));
function index() {
    return (react_1["default"].createElement("div", { className: index_module_scss_1["default"].superContainer },
        react_1["default"].createElement("div", { className: index_module_scss_1["default"].container },
            react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
                react_1["default"].createElement(react_router_dom_1.Routes, null,
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/user-feature-requests", element: react_1["default"].createElement(FeatureRequests_1["default"], { type: types_1.UserType.user }) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/login", element: react_1["default"].createElement(Login_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/company-feature-requests", element: react_1["default"].createElement(FeatureRequests_1["default"], { type: types_1.UserType.admin }) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/roadmap", element: react_1["default"].createElement(Roadmap_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "*", element: react_1["default"].createElement(react_router_dom_1.Navigate, { to: "/user-feature-request", replace: true }) }))))));
}
exports["default"] = index;
