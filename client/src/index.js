"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var client_1 = __importDefault(require("react-dom/client"));
var App_1 = __importDefault(require("./App"));
require("./styles/app.css");
var fontawesome_svg_core_1 = require("@fortawesome/fontawesome-svg-core");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var react_redux_1 = require("react-redux");
var store_1 = require("./app/store");
fontawesome_svg_core_1.library.add(free_solid_svg_icons_1.faCrown);
var root = client_1["default"].createRoot(document.getElementById('root'));
root.render(react_1["default"].createElement(react_redux_1.Provider, { store: store_1.store },
    react_1["default"].createElement(react_1["default"].StrictMode, null,
        react_1["default"].createElement(App_1["default"], null))));
