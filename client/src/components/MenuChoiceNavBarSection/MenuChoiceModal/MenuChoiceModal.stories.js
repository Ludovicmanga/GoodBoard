"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const MenuChoiceModal_1 = require("./MenuChoiceModal");
const react_1 = __importDefault(require("react"));
exports.default = {
    title: 'UI/MenuChoiceModal',
    component: MenuChoiceModal_1.MenuChoiceModal
};
const Default = () => {
    return react_1.default.createElement(MenuChoiceModal_1.MenuChoiceModal, null);
};
exports.Default = Default;
