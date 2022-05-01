"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var SignUpPage = function () {
    return (react_1["default"].createElement("form", { action: 'signUpForm' },
        react_1["default"].createElement("label", { htmlFor: 'signUpForm-email-input' }, "Pseudo"),
        react_1["default"].createElement("input", { type: "pseudo", value: "peudo", id: "signUpForm-pseudo-input" }),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("label", { htmlFor: 'signUpForm-email-input' }, "Email"),
        react_1["default"].createElement("input", { type: "email", value: "email", id: "signUpForm-email-input" }),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("label", { htmlFor: 'signUpForm-password-input' }, "Password"),
        react_1["default"].createElement("input", { type: "password", value: "password", id: "signUpForm-password-input" })));
};
exports["default"] = SignUpPage;
