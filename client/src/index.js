"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var client_1 = __importDefault(require("react-dom/client"));
var App_1 = __importDefault(require("./App"));
require("./styles/app.css");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var redux_devtools_extension_1 = require("redux-devtools-extension");
var redux_thunk_1 = __importDefault(require("redux-thunk"));
var reducers_1 = __importDefault(require("./reducers"));
var root = client_1["default"].createRoot(document.getElementById('root'));
var store = (0, redux_1.createStore)(reducers_1["default"], (0, redux_devtools_extension_1.composeWithDevTools)((0, redux_1.applyMiddleware)(redux_thunk_1["default"])));
root.render(react_1["default"].createElement(react_redux_1.Provider, { store: store },
    react_1["default"].createElement(react_1["default"].StrictMode, null,
        react_1["default"].createElement(App_1["default"], null))));
