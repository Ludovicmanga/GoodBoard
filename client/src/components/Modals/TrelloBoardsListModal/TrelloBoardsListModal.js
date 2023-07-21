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
import { Accordion, AccordionDetails, AccordionSummary, Backdrop, Checkbox, Fade, Modal, Paper, } from "@mui/material";
import { useState } from "react";
import styles from "./TrelloBoardsListModal.module.scss";
import axios from "axios";
import { websiteUrl } from "../../../helpers/constants";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useAppDispatch } from "../../../redux/hooks";
import { setGeneralProperties } from "../../../redux/features/generalPropertiesSlice";
var TrelloBoardsListModal = function (props) {
    var _a = useState([]), selectedLists = _a[0], setSelectedLists = _a[1];
    var _b = useState(false), importIsLoading = _b[0], setImportIsLoading = _b[1];
    var dispatch = useAppDispatch();
    var handleCreateCard = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setImportIsLoading(true);
                    return [4 /*yield*/, axios({
                            method: "POST",
                            url: "".concat(websiteUrl, "/api/integration/createTrelloCards"),
                            withCredentials: true,
                            data: {
                                listIds: selectedLists,
                                cardTitle: props.cardTitle,
                                cardDescription: props.cardDescription
                            }
                        })];
                case 1:
                    _a.sent();
                    setImportIsLoading(false);
                    props.handleClose();
                    dispatch(setGeneralProperties({
                        mainSnackBar: {
                            isOpen: true,
                            message: "The cards were created successfully"
                        }
                    }));
                    return [2 /*return*/];
            }
        });
    }); };
    var handleCheck = function (e) {
        if (e.target.checked) {
            setSelectedLists(function (currArray) { return __spreadArray(__spreadArray([], currArray, true), [e.target.value], false); });
        }
        else {
            setSelectedLists(function (currArray) {
                return currArray.filter(function (listId) { return listId !== e.target.value; });
            });
        }
    };
    return (_jsx("div", { children: _jsx(Modal, __assign({ "aria-labelledby": "transition-modal-title", "aria-describedby": "transition-modal-description", open: props.modalIsOpen, onClose: props.handleClose, closeAfterTransition: true, BackdropComponent: Backdrop, BackdropProps: {
                timeout: 500
            } }, { children: _jsx(Fade, __assign({ "in": props.modalIsOpen }, { children: _jsxs(Paper, __assign({ className: styles.modalContentContainer }, { children: [props.trelloBoardsList.length > 0 &&
                            props.trelloBoardsList.map(function (board) {
                                var _a, _b;
                                return (_jsxs(Accordion, __assign({ className: styles.boardBox }, { children: [_jsx(AccordionSummary, { children: _jsxs("div", __assign({ className: styles.AccordionSummaryContainer }, { children: [_jsx("div", { children: _jsx("img", { className: styles.boardImg, alt: "img", width: "120px", height: "60px", src: ((_b = (_a = board.prefs.backgroundImageScaled) === null || _a === void 0 ? void 0 : _a[7]) === null || _b === void 0 ? void 0 : _b.url) || 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1280x1920/ce93429aac87cc055c860d77deaf6ef3/photo-1564603246466-2e05759d2753.jpg' }) }), _jsx("div", __assign({ className: styles.boardNameContainer }, { children: board.name }))] })) }), board.lists.map(function (listElement) { return (_jsx(AccordionDetails, { children: _jsxs("div", __assign({ className: styles.detailBoxContainer }, { children: [_jsx("div", __assign({ className: styles.checkBox }, { children: _jsx(Checkbox, { onChange: function (e) { return handleCheck(e); }, value: listElement.id }) })), _jsx("div", __assign({ className: styles.detailBoxName }, { children: listElement.name }))] })) })); })] })));
                            }), _jsx(LoadingButton, __assign({ loading: importIsLoading, onClick: handleCreateCard, variant: "contained" }, { children: "Import" }))] })) })) })) }));
};
export default TrelloBoardsListModal;
