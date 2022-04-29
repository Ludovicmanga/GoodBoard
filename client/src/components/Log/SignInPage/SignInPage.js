"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SignInPage = () => {
    return (react_1.default.createElement("form", { action: 'signInForm' },
        react_1.default.createElement("label", { htmlFor: 'signInForm-email-input' }, "Email"),
        react_1.default.createElement("input", { type: "email", value: "email", id: "signInForm-email-input" }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("label", { htmlFor: 'signInForm-password-input' }, "Password"),
        react_1.default.createElement("input", { type: "password", value: "password", id: "signInForm-password-input" })));
};
exports.default = SignInPage;
