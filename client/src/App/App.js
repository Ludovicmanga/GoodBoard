"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var Routes_1 = __importDefault(require("../Routes"));
function App() {
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(Routes_1["default"], null)));
}
exports["default"] = App;
