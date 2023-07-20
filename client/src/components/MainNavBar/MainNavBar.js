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
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
import { SettingsModal } from "../Modals/Settings/SettingsModal";
import axios from "axios";
import { setLoggedUserState } from "../../redux/features/loggedUserSlice";
import { useNavigate } from "react-router-dom";
import { websiteUrl } from "../../helpers/constants";
import SwitchBoardModal from "../Modals/FeatureRequestModal/SwitchBoard/SwitchBoardModal";
import ShareBoardModal from "../Modals/ShareBoard/ShareBoardModal";
import DarkModeToggle from "../buttons/DarkModeToggle/DarkModeToggle";
import styles from "./MainNavBar.module.scss";
import ChangeBoardColorModal from "../Modals/ChangeBoardColorModal/ChangeBoardColorModal";
import ManageBoardModal from "../Modals/ManageBoardModal/ManageBoardModal";
import SettingsMenu from "../SettingsMenu/SettingsMenu";
import { UserType } from "../../helpers/types";
var pages = [
    {
        title: "your ideas",
        url: "/user-feature-requests"
    },
    {
        title: "our ideas",
        url: "/company-feature-requests"
    },
    {
        title: "roadmap",
        url: "/roadmap"
    },
    {
        title: "changelog",
        url: "/changelog"
    },
];
var MainNavBar = function () {
    var _a = useState(null), anchorElNav = _a[0], setAnchorElNav = _a[1];
    var _b = useState(null), anchorElUser = _b[0], setAnchorElUser = _b[1];
    var _c = useState([]), settingsRoleFiltered = _c[0], setSettingsRoleFiltered = _c[1];
    var dispatch = useAppDispatch();
    var navigate = useNavigate();
    var loggedUser = useAppSelector(function (state) { return state.loggedUser; });
    var generalPropertiesState = useAppSelector(function (state) { return state.generalProperties; });
    var handleLogout = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios({
                        url: "".concat(websiteUrl, "/api/users/logout"),
                        method: "post",
                        withCredentials: true
                    })];
                case 1:
                    response = _a.sent();
                    if (response.data.loggedOut) {
                        dispatch(setLoggedUserState({
                            user: null
                        }));
                        navigate("/login");
                        dispatch(setGeneralProperties({
                            mainSnackBar: {
                                isOpen: true,
                                message: "Successful logout"
                            }
                        }));
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleSettingsModal = function () {
        dispatch(setGeneralProperties({
            generalSettingsModalOpen: true
        }));
    };
    var handleChangeBoard = function () {
        dispatch(setGeneralProperties({
            switchBoardModalOpen: true
        }));
    };
    var handleManageBoard = function () {
        dispatch(setGeneralProperties({
            manageBoardModalOpen: true
        }));
    };
    var handleDisplayIntegrations = function () {
        navigate("/integrations");
    };
    var handleShareBoard = function () {
        dispatch(setGeneralProperties({
            shareBoardModalOpen: true
        }));
    };
    var settingsList = [
        {
            linkText: "My account",
            onClick: handleSettingsModal
        },
        {
            linkText: "Manage this board",
            onClick: handleManageBoard
        },
        {
            linkText: "Switch board",
            onClick: handleChangeBoard
        },
        {
            linkText: "Share your board",
            onClick: handleShareBoard
        },
        {
            linkText: "Integrations",
            onClick: handleDisplayIntegrations
        },
        {
            linkText: "Logout",
            onClick: handleLogout
        },
    ];
    /*   const handleDisplayChangeBoardColor = () => {
      dispatch(
        setGeneralProperties({
          changeBoardColorModalOpen: true,
        })
      );
    }; */
    useEffect(function () {
        var _a;
        if (((_a = loggedUser.user) === null || _a === void 0 ? void 0 : _a.roleOnThisBoard) === UserType.admin) {
            setSettingsRoleFiltered(settingsList);
        }
        else {
            setSettingsRoleFiltered(settingsList.filter(function (setting) {
                return setting.linkText !== "Manage this board" &&
                    setting.linkText !== "Share your board" &&
                    setting.linkText !== "Integrations";
            }));
        }
    }, [generalPropertiesState.activeBoard, loggedUser.user]);
    var handleCloseSettingsModal = function () {
        dispatch(setGeneralProperties({
            generalSettingsModalOpen: false
        }));
    };
    var handleCloseSwitchModal = function () {
        dispatch(setGeneralProperties({
            switchBoardModalOpen: false
        }));
    };
    var handleCloseShareBoardModal = function () {
        dispatch(setGeneralProperties({
            shareBoardModalOpen: false
        }));
    };
    var handleCloseManageBoardModal = function () {
        dispatch(setGeneralProperties({
            manageBoardModalOpen: false
        }));
    };
    var handleOpenUserMenu = function (event) {
        setAnchorElUser(event.currentTarget);
    };
    var handleCloseNavMenu = function () {
        setAnchorElNav(null);
    };
    var handleCloseUserMenu = function () {
        setAnchorElUser(null);
    };
    var handleGoToLoginPage = function () { return navigate("/login"); };
    return (_jsxs(AppBar, __assign({ position: "static" }, { children: [_jsx(Container, __assign({ maxWidth: "xl" }, { children: _jsxs(Toolbar, __assign({ disableGutters: true }, { children: [_jsx(EventNoteIcon, { sx: { display: { xs: "none", md: "flex" }, mr: 1 } }), _jsx(Typography, __assign({ variant: "h6", noWrap: true, component: "a", href: "/", sx: {
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none"
                            } }, { children: "GOODBOARD" })), _jsx(Box, __assign({ sx: { flexGrow: 1, display: { xs: "none", md: "flex" } } }, { children: pages.map(function (page) { return (_jsx(Button, __assign({ onClick: function () { return navigate(page.url); }, sx: { my: 2, color: "white", display: "block" } }, { children: page.title }), page.title)); }) })), _jsx("div", __assign({ className: styles.darkModeBtnContainer }, { children: _jsx(DarkModeToggle, {}) })), loggedUser.user ? (_jsx(SettingsMenu, { anchorElUser: anchorElUser, settings: settingsRoleFiltered, handleCloseUserMenu: handleCloseUserMenu, handleOpenUserMenu: handleOpenUserMenu })) : (_jsx("div", __assign({ onClick: handleGoToLoginPage, className: styles.logInBtn }, { children: "Log in" })))] })) })), _jsx(SettingsModal, { modalIsOpen: generalPropertiesState.generalSettingsModalOpen, handleClose: handleCloseSettingsModal }), _jsx(SwitchBoardModal, { modalIsOpen: generalPropertiesState.switchBoardModalOpen, handleClose: handleCloseSwitchModal }), _jsx(ShareBoardModal, { modalIsOpen: generalPropertiesState.shareBoardModalOpen, handleClose: handleCloseShareBoardModal }), _jsx(ManageBoardModal, { modalIsOpen: generalPropertiesState.manageBoardModalOpen, handleClose: handleCloseManageBoardModal }), _jsx(ChangeBoardColorModal, { modalIsOpen: generalPropertiesState.changeBoardColorModalOpen, handleClose: function () {
                    return dispatch(setGeneralProperties({
                        changeBoardColorModalOpen: false
                    }));
                } })] })));
};
export default MainNavBar;
