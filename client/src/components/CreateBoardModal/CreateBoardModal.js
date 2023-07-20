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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Add from "@mui/icons-material/Add";
import { Avatar, Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSetActiveBoard } from "../../helpers/boards";
import { websiteUrl } from "../../helpers/constants";
import { useAppDispatch } from "../../redux/hooks";
import ChooseBoardColor from "../ChooseBoardColor/ChooseBoardColor";
import styles from "./CreateBoardModal.module.scss";
import BoardIsPublicBtn from "../BoardIsPublicBtn/BoardIsPublicBtn";
var CreateBoardModal = function (props) {
    var _a = useState(""), name = _a[0], setName = _a[1];
    var _b = useState(""), description = _b[0], setDescription = _b[1];
    var _c = useState(""), website = _c[0], setWebsite = _c[1];
    var _d = useState('blue'), themeColor = _d[0], setThemeColor = _d[1];
    var _e = useState(false), boardIsPublic = _e[0], setBoardIsPublic = _e[1];
    var dispatch = useAppDispatch();
    var navigate = useNavigate();
    var handleBoardCreation = function () { return __awaiter(void 0, void 0, void 0, function () {
        var boardCreationResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios({
                        url: "".concat(websiteUrl, "/api/board/create"),
                        method: "post",
                        data: {
                            name: name,
                            description: description,
                            themeColor: themeColor,
                            boardIsPublic: boardIsPublic
                        },
                        withCredentials: true
                    })];
                case 1:
                    boardCreationResponse = _a.sent();
                    if (boardCreationResponse.data) {
                        handleSetActiveBoard(boardCreationResponse.data._id, dispatch, navigate);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleChangeBoardStatus = function (publicStatus) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setBoardIsPublic(publicStatus);
            return [2 /*return*/];
        });
    }); };
    return (_jsxs(_Fragment, { children: [_jsx(TextField, { onChange: function (e) { return setName(e.target.value); }, margin: "normal", required: true, fullWidth: true, id: "board-name", placeholder: "Ex: Tesla", label: "Name", name: "board-name", autoFocus: true, value: name }), _jsx(TextField, { onChange: function (e) { return setDescription(e.target.value); }, margin: "normal", required: true, fullWidth: true, id: "board-description", placeholder: "Ex: Tesla is a car company", label: "Description", name: "board-description", autoFocus: true, value: description }), _jsx(TextField, { onChange: function (e) { return setWebsite(e.target.value); }, margin: "normal", fullWidth: true, id: "board-url", placeholder: "Tesla.com", label: "Website url", name: "board-url", autoFocus: true, value: website }), _jsx(ChooseBoardColor, { mode: 'creation', setThemeColor: setThemeColor }), _jsx("h2", __assign({ className: styles.inputLabel }, { children: "Board logo" })), _jsx(Avatar, __assign({ variant: "rounded" }, { children: _jsx(Add, {}) })), _jsx(BoardIsPublicBtn, { boardIsPublic: boardIsPublic, handleChangeBoardStatus: handleChangeBoardStatus, isLoading: false }), _jsx(Button, __assign({ className: styles.submitBtn, onClick: handleBoardCreation, variant: "contained" }, { children: "Create board" }))] }));
};
export default CreateBoardModal;
