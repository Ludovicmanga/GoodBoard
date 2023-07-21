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
import { Backdrop, Fade, Modal, Paper, } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./ManageBoardModal.module.scss";
import ChooseBoardColor from "../../ChooseBoardColor/ChooseBoardColor";
import axios from "axios";
import { websiteUrl } from "../../../helpers/constants";
import { useAppSelector } from "../../../redux/hooks";
import BoardIsPublicBtn from "../../BoardIsPublicBtn/BoardIsPublicBtn";
import AdminsListSection from "../../AdminsList/AdminsListSection/AdminsListSection";
var ManageBoardModal = function (props) {
    var _a = useState(false), boardIsPublic = _a[0], setBoardIsPublic = _a[1];
    var _b = useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var generalPropertiesState = useAppSelector(function (state) { return state.generalProperties; });
    var handleChangeBoardStatus = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    return [4 /*yield*/, axios({
                            method: "post",
                            url: "".concat(websiteUrl, "/api/board/update-public-status"),
                            withCredentials: true,
                            data: {
                                publicStatus: event,
                                activeBoard: generalPropertiesState.activeBoard
                            }
                        })];
                case 1:
                    response = _a.sent();
                    setIsLoading(false);
                    if (response.data !== null && response.data !== undefined) {
                        setBoardIsPublic(response.data);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleGetPublicStatus = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios({
                        method: "post",
                        url: "".concat(websiteUrl, "/api/board/get-public-status"),
                        withCredentials: true,
                        data: { activeBoard: generalPropertiesState.activeBoard }
                    })];
                case 1:
                    response = _a.sent();
                    if (response.data) {
                        setBoardIsPublic(response.data);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        handleGetPublicStatus();
    }, [props.modalIsOpen]);
    return (_jsx("div", { children: _jsx(Modal, __assign({ "aria-labelledby": "transition-modal-title", "aria-describedby": "transition-modal-description", open: props.modalIsOpen, onClose: props.handleClose, closeAfterTransition: true, BackdropComponent: Backdrop, BackdropProps: {
                timeout: 500
            } }, { children: _jsx(Fade, __assign({ "in": props.modalIsOpen }, { children: _jsxs(Paper, __assign({ className: styles.modalContentContainer }, { children: [_jsx("h2", __assign({ className: styles.sectionTitle }, { children: "Manage board users" })), _jsx(AdminsListSection, {}), _jsx("h2", __assign({ className: styles.sectionTitle }, { children: "Manage board privacy" })), _jsx(BoardIsPublicBtn, { handleChangeBoardStatus: handleChangeBoardStatus, boardIsPublic: boardIsPublic, isLoading: isLoading }), _jsx("h2", __assign({ className: styles.sectionTitle }, { children: "Choose your board color" })), _jsx(ChooseBoardColor, { mode: "update" })] })) })) })) }));
};
export default ManageBoardModal;
