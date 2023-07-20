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
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { AiOutlineMail } from "react-icons/ai";
import { Avatar, Button, Card, Paper, TextField } from "@mui/material";
import axios from "axios";
import { websiteUrl } from "../../../helpers/constants";
import { setGeneralProperties } from "../../../redux/features/generalPropertiesSlice";
import { setEmail as setEmailRedux } from "../../../redux/features/loggedUserSlice";
import { validateEmail } from "../../../helpers/utils";
import styles from "./SettingsModal.module.scss";
import Add from "@mui/icons-material/Add";
import { FaPortrait } from "react-icons/fa";
export var SettingsModal = function (props) {
    var _a;
    var loggedUser = useAppSelector(function (state) { return state.loggedUser; });
    var _b = useState((_a = loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.user) === null || _a === void 0 ? void 0 : _a.email), email = _b[0], setEmail = _b[1];
    var _c = useState(false), wrongFormatEmail = _c[0], setWrongFormatEmail = _c[1];
    var _d = useState(""), emailErrorHelperText = _d[0], setEmailErrorHelperText = _d[1];
    var dispatch = useAppDispatch();
    var handleChangeUserEmail = function () { return __awaiter(void 0, void 0, void 0, function () {
        var updatedEmailResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!email) return [3 /*break*/, 3];
                    if (!validateEmail(email)) return [3 /*break*/, 2];
                    return [4 /*yield*/, axios({
                            method: "post",
                            url: "".concat(websiteUrl, "/api/users/update-email"),
                            data: {
                                updatedEmail: email
                            },
                            withCredentials: true
                        })];
                case 1:
                    updatedEmailResponse = _a.sent();
                    if (updatedEmailResponse.data.updatedEmail) {
                        if (email) {
                            dispatch(setEmailRedux(email));
                        }
                        dispatch(setGeneralProperties({
                            mainSnackBar: {
                                isOpen: true,
                                message: "Email successfully updated"
                            }
                        }));
                    }
                    return [3 /*break*/, 3];
                case 2:
                    setWrongFormatEmail(true);
                    setEmailErrorHelperText("Wrong email format");
                    setTimeout(function () {
                        setWrongFormatEmail(false);
                        setEmailErrorHelperText("");
                    }, 3000);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        var _a;
        if (props.modalIsOpen) {
            setEmail((_a = loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.user) === null || _a === void 0 ? void 0 : _a.email);
        }
    }, [props.modalIsOpen]);
    return (_jsx("div", { children: _jsx(Modal, __assign({ "aria-labelledby": "transition-modal-title", "aria-describedby": "transition-modal-description", open: props.modalIsOpen, onClose: props.handleClose, closeAfterTransition: true, BackdropComponent: Backdrop, BackdropProps: {
                timeout: 500
            } }, { children: _jsx(Fade, __assign({ "in": props.modalIsOpen }, { children: _jsxs(Paper, __assign({ className: styles.modalContentContainer }, { children: [_jsxs("div", __assign({ className: styles.settingSection }, { children: [_jsxs(Card, __assign({ className: styles.settingIllustrationContainer }, { children: [_jsx("div", __assign({ className: styles.iconContainer }, { children: _jsx(AiOutlineMail, {}) })), _jsx("div", __assign({ className: styles.iconSubtext }, { children: "Email" }))] })), _jsx(TextField, { inputMode: "email", value: email, onChange: function (e) { return setEmail(e.target.value); }, error: wrongFormatEmail, helperText: emailErrorHelperText, fullWidth: true, placeholder: "Ex: elon-musk@tesla.com" })] })), _jsxs("div", __assign({ className: styles.settingSection }, { children: [_jsxs(Card, __assign({ className: styles.settingIllustrationContainer }, { children: [_jsx("div", __assign({ className: styles.iconContainer }, { children: _jsx(FaPortrait, {}) })), _jsx("div", __assign({ className: styles.iconSubtext }, { children: "Picture" }))] })), _jsx(Avatar, __assign({ variant: "rounded" }, { children: _jsx(Add, {}) }))] })), _jsx(Button, __assign({ className: styles.submitButton, onClick: handleChangeUserEmail, variant: "contained" }, { children: "Save" }))] })) })) })) }));
};
