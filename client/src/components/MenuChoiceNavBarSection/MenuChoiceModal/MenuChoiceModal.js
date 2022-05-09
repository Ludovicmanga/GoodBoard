"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.MenuChoiceModal = void 0;
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var MenuChoiceModal = function (_a) {
    return (react_1["default"].createElement("div", { className: 'menuChoiceModal' },
        react_1["default"].createElement("ul", null,
            react_1["default"].createElement("li", null,
                react_1["default"].createElement(react_router_dom_1.NavLink, { to: "/" },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("i", { className: "fa-regular fa-face-smile menuChoiceModal--icon menuChoiceModal--icon" }),
                        "Feature requests"))),
            react_1["default"].createElement("li", { className: 'roadmapli' },
                react_1["default"].createElement(react_router_dom_1.NavLink, { to: "/roadmap" },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("i", { className: "fa-regular fa-map menuChoiceModal--icon menuChoiceModal--mapIcon" }),
                        "Roadmap"))))));
};
exports.MenuChoiceModal = MenuChoiceModal;
