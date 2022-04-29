"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const SignInPage_1 = __importDefault(require("./SignInPage"));
const react_1 = __importDefault(require("react"));
exports.default = {
    title: "UI/Sign In Page",
    component: SignInPage_1.default
};
const Default = () => (react_1.default.createElement(SignInPage_1.default, null));
exports.Default = Default;
