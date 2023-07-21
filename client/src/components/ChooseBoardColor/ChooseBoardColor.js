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
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import styles from "./ChooseBoardColor.module.scss";
import CheckIcon from "@mui/icons-material/Check";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
import axios from "axios";
import { websiteUrl } from "../../helpers/constants";
var ChooseBoardColor = function (props) {
    var activeBoardId = useAppSelector(function (state) { return state.generalProperties.activeBoard; });
    var dispatch = useAppDispatch();
    var handleChangeColorTheme = function (colorTheme) { return __awaiter(void 0, void 0, void 0, function () {
        var updateColorRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setSelected(colorTheme);
                    if (!(props.mode === "creation" && props.setThemeColor)) return [3 /*break*/, 1];
                    props.setThemeColor(colorTheme.name);
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, axios({
                        method: "post",
                        data: {
                            boardId: activeBoardId,
                            themeColor: colorTheme.name
                        },
                        url: "".concat(websiteUrl, "/api/board/update-color")
                    })];
                case 2:
                    updateColorRes = _a.sent();
                    if (updateColorRes) {
                        dispatch(setGeneralProperties({
                            mainSnackBar: {
                                isOpen: true,
                                message: "The theme color of your board is updated"
                            }
                        }));
                        dispatch(setGeneralProperties({
                            darkMode: false
                        }));
                        dispatch(setGeneralProperties({
                            colorMode: updateColorRes.data
                        }));
                    }
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var colors = [
        {
            name: "blue",
            hex: "#1976d2"
        },
        {
            name: "red",
            hex: "#F43C2B"
        },
        {
            name: "green",
            hex: "#469C63"
        },
        {
            name: "yellow",
            hex: "#EDD91A"
        },
    ];
    var generalPropertiesState = useAppSelector(function (state) { return state.generalProperties; });
    var _a = useState(null), selected = _a[0], setSelected = _a[1];
    useEffect(function () {
        var foundActiveColor = colors.find(function (color) { return color.name === generalPropertiesState.colorMode; });
        if (foundActiveColor) {
            setSelected(foundActiveColor);
        }
    }, [generalPropertiesState.colorMode]);
    return (_jsx(_Fragment, { children: _jsx("div", __assign({ className: styles.colorPaletteBoxContainer }, { children: colors.map(function (color) { return (_jsx("div", __assign({ onClick: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, handleChangeColorTheme(color)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                }); }); } }, { children: _jsx(Avatar, __assign({ sx: {
                        background: "".concat(color.hex)
                    }, className: styles.colorPaletteBox, variant: "rounded" }, { children: selected && selected.name === color.name && _jsx(CheckIcon, {}) })) }))); }) })) }));
};
export default ChooseBoardColor;
