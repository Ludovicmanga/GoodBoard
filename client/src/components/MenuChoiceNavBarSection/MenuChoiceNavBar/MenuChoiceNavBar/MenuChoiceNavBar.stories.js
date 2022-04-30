"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const MenuChoiceNavBar_1 = require("./MenuChoiceNavBar");
const react_1 = __importDefault(require("react"));
exports.default = {
    title: 'UI/MenuChoiceNavBar',
    component: MenuChoiceNavBar_1.MenuChoiceNavBar
};
const Default = () => {
    return react_1.default.createElement(MenuChoiceNavBar_1.MenuChoiceNavBar, { currentPage: "feature requests" });
};
exports.Default = Default;
