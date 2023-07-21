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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import styles from "./ShareBoardModal.module.scss";
import { Button, IconButton, OutlinedInput, Paper } from "@mui/material";
import CopyToClipboardButton from "../../buttons/CopyToClipboardButton/CopyToClipboardButton";
import axios from "axios";
import { websiteUrl } from "../../../helpers/constants";
import { useAppSelector } from "../../../redux/hooks";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { UserType } from "../../../helpers/types";
import UserWithRoleInput from "../../UserWithRoleInput/UserWithRoleInput";
import { getBoardShareableUrl } from "../../../helpers/boards";
var ShareBoardModal = function (props) {
    var _a = useState([
        {
            id: Math.floor(Math.random() * 10),
            email: "",
            role: UserType.member
        },
    ]), usersToInviteList = _a[0], setUsersToInviteList = _a[1];
    var boardId = useAppSelector(function (state) { return state.generalProperties.activeBoard; });
    var _b = useState(""), boardUrl = _b[0], setBoardUrl = _b[1];
    var sendAdminInvitations = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios({
                        method: "post",
                        url: "".concat(websiteUrl, "/api/board/invite-users"),
                        withCredentials: true,
                        data: { usersToInviteList: usersToInviteList, boardId: boardId }
                    })];
                case 1:
                    response = _a.sent();
                    if (response.data) {
                        props.handleClose();
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleSetBoardUrl = function (e) {
        setBoardUrl(e.target.value);
    };
    var handleGetShareableUrl = function () { return __awaiter(void 0, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!boardId) return [3 /*break*/, 2];
                    return [4 /*yield*/, getBoardShareableUrl(boardId)];
                case 1:
                    url = _a.sent();
                    if (url) {
                        setBoardUrl(url);
                    }
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var handleAddNewUserToInvite = function () {
        setUsersToInviteList(function (currArray) { return __spreadArray(__spreadArray([], currArray, true), [
            {
                id: Math.floor(Math.random() * 10),
                email: "",
                role: UserType.member
            },
        ], false); });
    };
    useEffect(function () {
        handleGetShareableUrl();
    }, [boardId]);
    useEffect(function () {
        if (!props.modalIsOpen) {
            setUsersToInviteList([
                {
                    id: Math.floor(Math.random() * 10),
                    email: "",
                    role: UserType.member
                },
            ]);
        }
    }, [props.modalIsOpen]);
    return (_jsx("div", { children: _jsx(Modal, __assign({ "aria-labelledby": "transition-modal-title", "aria-describedby": "transition-modal-description", open: props.modalIsOpen, onClose: props.handleClose, closeAfterTransition: true, BackdropComponent: Backdrop, BackdropProps: {
                timeout: 500
            } }, { children: _jsx(Fade, __assign({ "in": props.modalIsOpen }, { children: _jsxs(Paper, __assign({ className: styles.modalContentContainer }, { children: [_jsx("div", __assign({ className: styles.sectionTitle }, { children: "Invite new members to your board" })), _jsxs("div", __assign({ className: "".concat(styles.sectionContainer, " ").concat(styles.adminInviteSection) }, { children: [_jsxs("div", __assign({ className: styles.inviteSectionLeft }, { children: [_jsx("div", __assign({ className: styles.adminInputsContainer }, { children: usersToInviteList.map(function (userToInvite) { return (_jsx(UserWithRoleInput, { id: userToInvite.id, setUsersToInviteList: setUsersToInviteList, usersToInviteList: usersToInviteList }, userToInvite.id)); }) })), _jsx(Button, __assign({ variant: "contained", onClick: sendAdminInvitations }, { children: "Send invites" }))] })), _jsx("div", __assign({ className: styles.inviteSectionRight }, { children: _jsx(IconButton, __assign({ "aria-label": "delete", onClick: handleAddNewUserToInvite, color: "primary" }, { children: _jsx(AiOutlinePlusCircle, { size: 25 }) })) }))] })), _jsx("div", __assign({ className: "".concat(styles.sectionTitle, " ").concat(styles.shareBoardSectionTitle) }, { children: "Share your board with the world" })), _jsx("div", __assign({ className: styles.sectionContainer }, { children: _jsx(OutlinedInput, { value: boardUrl, fullWidth: true, onChange: handleSetBoardUrl, size: "small", readOnly: true, className: styles.outlinedInput, endAdornment: _jsx("div", __assign({ className: styles.CopyToClipboardButtonContainer }, { children: _jsx(CopyToClipboardButton, { textToCopy: boardUrl }) })) }) }))] })) })) })) }));
};
export default ShareBoardModal;
