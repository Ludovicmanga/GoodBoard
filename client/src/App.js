"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Index_1 = __importDefault(require("./components/Routes/Index"));
const react_1 = __importDefault(require("react"));
const App = () => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Index_1.default, null)));
};
exports.default = App;
