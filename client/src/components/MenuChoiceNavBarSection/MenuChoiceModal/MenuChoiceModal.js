"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuChoiceModal = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const MenuChoiceModal = ({}) => {
    return (react_1.default.createElement("div", { className: 'menuChoiceModal' },
        react_1.default.createElement("ul", null,
            react_1.default.createElement("li", null,
                react_1.default.createElement(react_router_dom_1.NavLink, { to: "/" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("i", { className: "fa-regular fa-face-smile menuChoiceModal--icon" }),
                        "Feature requests"))),
            react_1.default.createElement("li", { className: 'roadmapli' },
                react_1.default.createElement(react_router_dom_1.NavLink, { to: "/roadmap" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("i", { className: "fa-regular fa-map menuChoiceModal--icon" }),
                        "Roadmap"))))));
};
exports.MenuChoiceModal = MenuChoiceModal;
