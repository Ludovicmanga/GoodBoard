"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const SignUpPage_1 = __importDefault(require("./SignUpPage"));
const react_1 = __importDefault(require("react"));
exports.default = {
    title: "UI/Sign Up Page",
    component: SignUpPage_1.default
};
const Default = () => (react_1.default.createElement(SignUpPage_1.default, null));
exports.Default = Default;
