"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
function MainNavBar() {
    return (react_1.default.createElement("nav", { className: "mainNavbar" },
        react_1.default.createElement("div", { className: "mainNavbar--container" },
            react_1.default.createElement("div", { className: "logo" },
                react_1.default.createElement(react_router_dom_1.NavLink, { to: "/" },
                    react_1.default.createElement("div", { className: "logo_container" },
                        react_1.default.createElement("img", { src: "./images/site_logo.png", alt: "icon" })))),
            react_1.default.createElement("ul", { className: "mainNavbar--linksContainer" },
                react_1.default.createElement("li", { className: '/signup' },
                    react_1.default.createElement(react_router_dom_1.NavLink, { to: "/signUp" },
                        react_1.default.createElement("h5", null, "Fonctionnalit\u00E9s"))),
                react_1.default.createElement("li", { className: '/signup' },
                    react_1.default.createElement(react_router_dom_1.NavLink, { to: "/signUp" },
                        react_1.default.createElement("h5", null, "Tarif"))),
                react_1.default.createElement("li", { className: '/login' },
                    react_1.default.createElement(react_router_dom_1.NavLink, { to: "/signIn" },
                        react_1.default.createElement("h5", null, "Se connecter"))),
                react_1.default.createElement("li", { className: '/signup' },
                    react_1.default.createElement(react_router_dom_1.NavLink, { to: "/signUp" },
                        react_1.default.createElement("h5", null, "S'inscrire")))))));
}
exports.default = MainNavBar;
