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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var axios_1 = __importDefault(require("axios"));
var react_1 = __importStar(require("react"));
var SignInPage_1 = __importDefault(require("../SignInPage/SignInPage"));
var SignUpPage = function () {
    var _a = (0, react_1.useState)(false), formSubmit = _a[0], setFormSubmit = _a[1];
    var _b = (0, react_1.useState)(''), pseudo = _b[0], setPseudo = _b[1];
    var _c = (0, react_1.useState)(''), email = _c[0], setEmail = _c[1];
    var _d = (0, react_1.useState)(''), password = _d[0], setPassword = _d[1];
    var handleRegister = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            e.preventDefault();
            axios_1["default"]
                .post("http://localhost:5000/users/sign-up", {
                email: email,
                password: password,
                pseudo: pseudo,
                type: "user"
            }, { withCredentials: true })
                .then(function (res) {
                if (res.data.formattedErrors) {
                    console.log(res.data.formattedErrors);
                    /* emailError.innerHTML = res.data.formattedErrors.email;
                    passwordError.innerHTML = res.data.formattedErrors.password; */
                }
                else {
                    setFormSubmit(function () { return true; });
                }
            })["catch"](function (error) { console.log(error); });
            return [2 /*return*/];
        });
    }); };
    return (react_1["default"].createElement(react_1["default"].Fragment, null, formSubmit ? (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(SignInPage_1["default"], null),
        react_1["default"].createElement("span", null),
        react_1["default"].createElement("h4", { className: 'success' }, "Enregistrement r\u00E9ussi, veuillez vous connecter"))) :
        react_1["default"].createElement("form", { action: 'signUpForm', onSubmit: handleRegister },
            react_1["default"].createElement("label", { htmlFor: 'signUpForm-email-input' }, "Pseudo"),
            react_1["default"].createElement("input", { type: "pseudo", value: pseudo, onChange: function (e) { return setPseudo(e.target.value); }, id: "signUpForm-pseudo-input" }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", { htmlFor: 'signUpForm-email-input' }, "Email"),
            react_1["default"].createElement("input", { type: "email", onChange: function (e) { return setEmail(e.target.value); }, value: email, id: "signUpForm-email-input" }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", { htmlFor: 'signUpForm-password-input' }, "Password"),
            react_1["default"].createElement("input", { type: "password", onChange: function (e) { return setPassword(e.target.value); }, value: password, id: "signUpForm-password-input" }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("input", { type: "submit", value: "s'inscrire" }))));
};
exports["default"] = SignUpPage;
