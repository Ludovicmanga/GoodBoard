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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
var SettingsMenu = function (props) {
    return (_jsxs(Box, __assign({ sx: { flexGrow: 0 } }, { children: [_jsx(Tooltip, __assign({ title: "Param\u00E8tres" }, { children: _jsx(IconButton, __assign({ onClick: props.handleOpenUserMenu, sx: { p: 0 } }, { children: _jsx(AccountCircleIcon, { sx: { fontSize: 40, color: "#F6F6F6" } }) })) })), _jsx(Menu, __assign({ sx: { mt: "45px" }, id: "menu-appbar", anchorEl: props.anchorElUser, anchorOrigin: {
                    vertical: "top",
                    horizontal: "right"
                }, keepMounted: true, transformOrigin: {
                    vertical: "top",
                    horizontal: "right"
                }, open: Boolean(props.anchorElUser), onClose: props.handleCloseUserMenu }, { children: props.settings.map(function (setting) { return (_jsx(MenuItem, __assign({ onClick: setting.onClick }, { children: _jsx(Typography, __assign({ textAlign: "center" }, { children: setting.linkText })) }), setting.linkText)); }) }))] })));
};
export default SettingsMenu;
