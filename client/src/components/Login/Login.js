var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./Login.module.scss";
import Avatar from "@mui/material/Avatar";
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { GoogleLogin } from "@react-oauth/google";
import { Divider, Grid } from "@mui/material";
import axios from "axios";
import { AuthPageType } from "../../helpers/types";
import { useAppDispatch } from "../../redux/hooks";
import { setLoggedUserState } from "../../redux/features/loggedUserSlice";
import { useNavigate } from "react-router-dom";
import Link from '@mui/material/Link';
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
import { websiteUrl } from "../../helpers/constants";
var Login = function (props) {
    var _a = useState(''), email = _a[0], setEmail = _a[1];
    var _b = useState(''), password = _b[0], setPassword = _b[1];
    var _c = useState(false), buttonIsLoading = _c[0], setButtonIsLoading = _c[1];
    var dispatch = useAppDispatch();
    var navigate = useNavigate();
    var handleAuthOnEnter = function (e) {
        if (e.key === 'Enter') {
            handleAuth();
        }
    };
    var handleAuth = function () { return __awaiter(void 0, void 0, void 0, function () {
        var userResponse, signUpResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(props.authType === AuthPageType.login)) return [3 /*break*/, 2];
                    setButtonIsLoading(true);
                    return [4 /*yield*/, axios({
                            url: "".concat(websiteUrl, "/api/users/login"),
                            method: "post",
                            data: {
                                email: email,
                                password: password
                            },
                            withCredentials: true
                        })];
                case 1:
                    userResponse = _a.sent();
                    setButtonIsLoading(false);
                    if (userResponse.data.user) {
                        dispatch(setLoggedUserState({
                            user: userResponse.data.user
                        }));
                        navigate("/");
                        dispatch(setGeneralProperties({
                            mainSnackBar: {
                                isOpen: true,
                                message: "Welcome ".concat(userResponse.data.user.email, " !")
                            }
                        }));
                    }
                    _a.label = 2;
                case 2:
                    if (!(props.authType === AuthPageType.signUp)) return [3 /*break*/, 4];
                    setButtonIsLoading(true);
                    return [4 /*yield*/, axios({
                            url: "".concat(websiteUrl, "/api/users/sign-up"),
                            method: "post",
                            data: {
                                email: email,
                                password: password
                            }
                        })];
                case 3:
                    signUpResponse = _a.sent();
                    setButtonIsLoading(false);
                    if (signUpResponse.data.user) {
                        navigate("/login");
                        dispatch(setGeneralProperties({
                            mainSnackBar: {
                                isOpen: true,
                                message: "Successful sign up !"
                            }
                        }));
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (_jsx("div", __assign({ className: styles.container }, { children: _jsx(Container, __assign({ component: "main", maxWidth: "xs" }, { children: _jsxs(Box, __assign({ sx: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                } }, { children: [_jsx(Avatar, __assign({ sx: { m: 1, bgcolor: "secondary.main" } }, { children: _jsx(LockOutlinedIcon, {}) })), _jsx(Typography, __assign({ component: "h1", variant: "h5" }, { children: props.authType === AuthPageType.login ? 'Sign In' : 'Sign up' })), _jsxs(Box, __assign({ component: "form", noValidate: true, sx: { mt: 1 } }, { children: [_jsx(TextField, { onChange: function (e) { return setEmail(e.target.value); }, margin: "normal", required: true, fullWidth: true, id: "email", label: "Email Address", name: "username", autoComplete: "email", autoFocus: true }), _jsx(TextField, { onChange: function (e) { return setPassword(e.target.value); }, onKeyDown: handleAuthOnEnter, margin: "normal", required: true, fullWidth: true, name: "password", label: "Password", type: "password", id: "password", autoComplete: "current-password" }), _jsxs(Grid, __assign({ container: true }, { children: [_jsx(Grid, __assign({ item: true, xs: true }, { children: _jsx(Link, __assign({ className: styles.link, href: "#", variant: "body2" }, { children: "Forgot password?" })) })), _jsx(Grid, __assign({ item: true }, { children: _jsx(Link, __assign({ className: styles.link, href: props.authType === AuthPageType.login ? "".concat(websiteUrl, "/sign-up") : "".concat(websiteUrl, "/login"), variant: "body2" }, { children: props.authType === AuthPageType.login ? "Don't have an account? Sign Up" : "Already have an account? Log in" })) }))] })), _jsxs("div", __assign({ className: styles.buttonsContainer }, { children: [_jsx(LoadingButton, __assign({ loading: buttonIsLoading, onClick: handleAuth, fullWidth: true, variant: "contained", className: styles.button }, { children: props.authType === AuthPageType.login ? 'Sign In' : 'Sign up' })), _jsx(Divider, { className: styles.divider }), _jsx(GoogleLogin, { onSuccess: function (credentialResponse) {
                                            console.log(credentialResponse);
                                        }, onError: function () {
                                            console.log("Login Failed");
                                        }, useOneTap: true })] }))] }))] })) })) })));
};
export default Login;
