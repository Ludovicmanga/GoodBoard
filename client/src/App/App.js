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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Alert, createTheme, CssBaseline, Snackbar, ThemeProvider, } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { useEffect } from "react";
import { websiteUrl } from "../helpers/constants";
import { setAllFeatureRequests } from "../redux/features/allFeatureRequestsSlice";
import { setGeneralProperties } from "../redux/features/generalPropertiesSlice";
import { setLoggedUserState } from "../redux/features/loggedUserSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Routes from "../Routes";
import "./App.module.scss";
import { getLoggedUser } from "../helpers/users";
function App() {
    var _this = this;
    var _a;
    var dispatch = useAppDispatch();
    var generalPropertiesState = useAppSelector(function (state) { return state.generalProperties; });
    var loggedUserState = useAppSelector(function (state) { return state.loggedUser; });
    var lightTheme = createTheme({
        palette: {
            mode: "light"
        }
    });
    var greenTheme = createTheme({
        palette: {
            primary: {
                main: "#469C63"
            },
            secondary: {
                main: "#6EC382"
            }
        }
    });
    var redTheme = createTheme({
        palette: {
            primary: {
                main: "#F43C2B"
            },
            secondary: {
                main: "#E27476"
            }
        }
    });
    var yellowTheme = createTheme({
        palette: {
            primary: {
                main: "#EDD91A"
            },
            secondary: {
                main: "#FFE600"
            }
        }
    });
    var darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "rgba(0, 0, 0)"
            }
        }
    });
    var themes = [
        {
            color: "green",
            theme: greenTheme
        },
        {
            color: "blue",
            theme: lightTheme
        },
        {
            color: "yellow",
            theme: yellowTheme
        },
        {
            color: "red",
            theme: redTheme
        },
    ];
    var getAllBoardFeatureRequestsApiCall = function (activeBoard) { return __awaiter(_this, void 0, void 0, function () {
        var allUsersFeatureRequests;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios({
                        url: "".concat(websiteUrl, "/api/feature-request/get/all-from-board"),
                        method: "post",
                        data: {
                            boardId: activeBoard
                        },
                        withCredentials: true
                    })];
                case 1:
                    allUsersFeatureRequests = _a.sent();
                    if (allUsersFeatureRequests.data === "user doesn't have access to the board") {
                        console.log("Afficher un simple message derreur indiquant que lutilisateur n a pas acces au board, qui est privé");
                    }
                    else {
                        return [2 /*return*/, allUsersFeatureRequests.data];
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var getAllBoardFeatureRequests = function (activeBoard) { return __awaiter(_this, void 0, void 0, function () {
        var allFeatureRequests;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAllBoardFeatureRequestsApiCall(activeBoard)];
                case 1:
                    allFeatureRequests = _a.sent();
                    dispatch(setAllFeatureRequests(allFeatureRequests));
                    return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        dispatch(setGeneralProperties({
            activeBoard: localStorage.getItem("board")
        }));
    }, []);
    useEffect(function () {
        if (generalPropertiesState.activeBoard &&
            generalPropertiesState.activeBoard.length > 0) {
            getAllBoardFeatureRequests(generalPropertiesState.activeBoard);
        }
    }, [generalPropertiesState.activeBoard]);
    var handleGetLoggedUser = function () { return __awaiter(_this, void 0, void 0, function () {
        var userResponse, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getLoggedUser(generalPropertiesState.activeBoard)];
                case 1:
                    userResponse = _a.sent();
                    if (userResponse.data.user) {
                        user = userResponse.data.user;
                        dispatch(setLoggedUserState({
                            user: {
                                _id: user._id,
                                email: user.email,
                                roleOnThisBoard: userResponse.data.roleUserOnThisBoard,
                                voted: user.voted
                            }
                        }));
                    }
                    if (userResponse.data.notAuthenticated) {
                        dispatch(setLoggedUserState({
                            user: null
                        }));
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        handleGetLoggedUser();
    }, [generalPropertiesState.activeBoard, dispatch, loggedUserState.user]);
    return (_jsx(GoogleOAuthProvider, __assign({ clientId: "359793701193-uesb1dbegpv1batpku2ro9le0fjnf8il.apps.googleusercontent.com" }, { children: _jsxs(_Fragment, { children: [_jsx(Snackbar, __assign({ open: generalPropertiesState.mainSnackBar.isOpen, autoHideDuration: 4000, onClose: function () {
                        dispatch(setGeneralProperties({
                            mainSnackBar: {
                                isOpen: false,
                                message: ""
                            }
                        }));
                    } }, { children: _jsx(Alert, __assign({ onClose: function () {
                            dispatch(setGeneralProperties({
                                mainSnackBar: {
                                    isOpen: false,
                                    message: ""
                                }
                            }));
                        }, severity: "success", sx: { width: "100%" } }, { children: generalPropertiesState.mainSnackBar.message })) })), _jsxs(ThemeProvider, __assign({ theme: generalPropertiesState.darkMode === true
                        ? darkTheme
                        : ((_a = themes.find(function (colorTheme) {
                            return colorTheme.color === generalPropertiesState.colorMode;
                        })) === null || _a === void 0 ? void 0 : _a.theme) || lightTheme }, { children: [_jsx(Routes, {}), _jsx(CssBaseline, {})] }))] }) })));
}
export default App;
