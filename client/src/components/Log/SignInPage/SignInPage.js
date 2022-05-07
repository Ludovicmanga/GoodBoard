"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var axios_1 = __importDefault(require("axios"));
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var SignInPage = function () {
    var _a = (0, react_1.useState)(''), email = _a[0], setEmail = _a[1];
    var _b = (0, react_1.useState)(''), password = _b[0], setPassword = _b[1];
    var dispatch = (0, react_redux_1.useDispatch)();
    var handleLogin = function (e) {
        e.preventDefault();
        axios_1["default"]
            .post("http://localhost:5000/users/login", {
            email: email,
            password: password
        }, { withCredentials: true })
            .then(function (res) {
            if (res.data.formattedErrors) {
                console.log(res.data.formattedErrors);
                /* emailError.innerHTML = res.data.formattedErrors.email;
                passwordError.innerHTML = res.data.formattedErrors.password; */
            }
            else {
                window.location.href = "/";
            }
        })["catch"](function (error) { console.log(error); });
    };
    return (react_1["default"].createElement("form", { action: 'signInForm', onSubmit: handleLogin },
        react_1["default"].createElement("label", { htmlFor: 'signInForm-email-input' }, "Email"),
        react_1["default"].createElement("input", { type: "email", onChange: function (e) { return setEmail(e.target.value); }, value: email, id: "signInForm-email-input" }),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("label", { htmlFor: 'signInForm-password-input' }, "Password"),
        react_1["default"].createElement("input", { type: "password", onChange: function (e) { return setPassword(e.target.value); }, value: password, id: "signInForm-password-input" }),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("input", { type: "submit", value: "se connecter" })));
};
exports["default"] = SignInPage;
