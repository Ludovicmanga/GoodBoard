"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Home_1 = __importDefault(require("../../pages/Home"));
const react_router_dom_1 = require("react-router-dom");
const MainNavBar_1 = __importDefault(require("../MainNavBar"));
const SignInPage_1 = __importDefault(require("../Log/SignInPage/SignInPage"));
const SignUpPage_1 = __importDefault(require("../Log/SignUpPage/SignUpPage"));
const RoadMap_1 = require("../../pages/RoadMap");
const MenuChoiceNavBar_1 = require("../MenuChoiceNavBarSection/MenuChoiceButton/MenuChoiceButton/MenuChoiceNavBar");
function index() {
    return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(MainNavBar_1.default, null),
        react_1.default.createElement(MenuChoiceNavBar_1.MenuChoiceNavBar, null),
        react_1.default.createElement(react_router_dom_1.Routes, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(Home_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/roadmap", element: react_1.default.createElement(RoadMap_1.RoadMap, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/login", element: react_1.default.createElement(SignInPage_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/signUp", element: react_1.default.createElement(SignUpPage_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "*", element: react_1.default.createElement(react_router_dom_1.Navigate, { to: "/", replace: true }) }))));
}
exports.default = index;
