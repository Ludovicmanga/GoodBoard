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
import { Avatar, Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./MainHero.module.scss";
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";
import axios from "axios";
import { websiteUrl } from "../../helpers/constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import EmptyImage from "../EmptyImage/EmptyImage";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
import CannotMakeActionAsGuestModal from "../Modals/CannotMakeActionAsGuestModal/CannotMakeActionAsGuestModal";
var MainHero = function (props) {
    var generalPropertiesState = useAppSelector(function (state) { return state.generalProperties; });
    var dispatch = useAppDispatch();
    var _a = useState({
        _id: "",
        name: "",
        description: "",
        picture: "",
        themeColor: ""
    }), boardData = _a[0], setBoardData = _a[1];
    useEffect(function () {
        if (generalPropertiesState.activeBoard &&
            generalPropertiesState.activeBoard.length > 0) {
            getActiveBoardData(generalPropertiesState.activeBoard);
        }
    }, [generalPropertiesState.activeBoard]);
    useEffect(function () {
        if (boardData.themeColor.length > 0) {
            dispatch(setGeneralProperties({
                colorMode: boardData.themeColor
            }));
        }
    }, [boardData.themeColor]);
    var getActiveBoardData = function (activeBoard) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            handleDispatchActiveBoardData();
            return [2 /*return*/];
        });
    }); };
    var handleDispatchActiveBoardData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios({
                        url: "".concat(websiteUrl, "/api/board/get/").concat(generalPropertiesState.activeBoard)
                    })];
                case 1:
                    response = _a.sent();
                    if (response.data) {
                        setBoardData(response.data);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var theme = useTheme();
    return (_jsxs(Box, __assign({ className: styles.container, sx: {
            background: theme.palette.primary.main
        } }, { children: [_jsxs("div", __assign({ className: styles.contentWrapper }, { children: [boardData.picture ? (_jsx(Avatar, { className: styles.companyLogo, alt: "Company logo pic", src: boardData.picture, sx: {
                            height: 85,
                            width: 85
                        } })) : (_jsx(EmptyImage, {})), _jsxs("div", __assign({ className: styles.text }, { children: [_jsx("div", __assign({ className: styles.companyName }, { children: boardData.name })), _jsx("div", __assign({ className: styles.companyDescription }, { children: boardData.description })), _jsx("a", __assign({ rel: "noreferrer", target: "_blank", href: "https://www.apple.com/" }, { children: _jsx("div", __assign({ className: styles.companyLink }, { children: "Voir le site web" })) })), _jsx("div", { children: _jsxs("div", __assign({ className: styles.socialLinks }, { children: [_jsx(BsFacebook, { className: styles.socialNetworkIcon }), _jsx(AiFillInstagram, { className: styles.socialNetworkIcon }), _jsx(AiFillTwitterCircle, { className: styles.socialNetworkIcon })] })) })] }))] })), _jsx(CannotMakeActionAsGuestModal, { modalIsOpen: generalPropertiesState.cannotMakeActionModalOpen, handleClose: function () {
                    return dispatch(setGeneralProperties({
                        cannotMakeActionModalOpen: false
                    }));
                } })] })));
};
export default MainHero;
