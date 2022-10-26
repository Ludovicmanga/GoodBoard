"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var client_1 = __importDefault(require("react-dom/client"));
var App_1 = __importDefault(require("./App/App"));
var store_1 = require("./redux/store");
var react_redux_1 = require("react-redux");
var root = client_1["default"].createRoot(document.getElementById('root'));
root.render(react_1["default"].createElement(react_redux_1.Provider, { store: store_1.store },
    react_1["default"].createElement(App_1["default"], null)));
