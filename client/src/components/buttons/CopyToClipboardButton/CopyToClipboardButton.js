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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import { TbCopy } from "react-icons/tb";
var CopyToClipboardButton = function (props) {
    var _a = useState(false), open = _a[0], setOpen = _a[1];
    var handleClick = function () {
        setOpen(true);
        navigator.clipboard.writeText(props.textToCopy);
    };
    return (_jsxs(_Fragment, { children: [_jsx(IconButton, __assign({ onClick: handleClick, color: "primary" }, { children: _jsx(TbCopy, {}) })), _jsx(Snackbar, { message: "Copied to clipboard", anchorOrigin: { vertical: "top", horizontal: "center" }, autoHideDuration: 2000, onClose: function () { return setOpen(false); }, open: open })] }));
};
export default CopyToClipboardButton;
