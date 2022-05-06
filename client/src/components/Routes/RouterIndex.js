"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importStar(require("react"));
var Home_1 = __importDefault(require("../../pages/Home"));
var react_router_dom_1 = require("react-router-dom");
var MainNavBar_1 = __importDefault(require("../MainNavBar"));
var SignInPage_1 = __importDefault(require("../Log/SignInPage/SignInPage"));
var SignUpPage_1 = __importDefault(require("../Log/SignUpPage/SignUpPage"));
var RoadMap_1 = require("../../pages/RoadMap");
var MenuChoiceNavBar_1 = require("../MenuChoiceNavBarSection/MenuChoiceNavBar/MenuChoiceNavBar/MenuChoiceNavBar");
var RouterIndex = function (_a) {
    var _b = (0, react_1.useState)('Feature requests'), currentPage = _b[0], setCurrentPage = _b[1];
    var handleCurrentPage = function (currentPageParam) {
        setCurrentPage(function () { return currentPageParam; });
    };
    return (react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
        react_1["default"].createElement(MainNavBar_1["default"], null),
        react_1["default"].createElement(MenuChoiceNavBar_1.MenuChoiceNavBar, { currentPage: currentPage }),
        react_1["default"].createElement(react_router_dom_1.Routes, null,
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/", element: react_1["default"].createElement(Home_1["default"], { handleCurrentPage: handleCurrentPage }) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/roadmap", element: react_1["default"].createElement(RoadMap_1.RoadMap, { handleCurrentPage: handleCurrentPage }) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/login", element: react_1["default"].createElement(SignInPage_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/signUp", element: react_1["default"].createElement(SignUpPage_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "*", element: react_1["default"].createElement(react_router_dom_1.Navigate, { to: "/", replace: true }) }))));
};
exports["default"] = RouterIndex;
