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
import { Avatar, IconButton, Typography } from "@mui/material";
import styles from "./BoardInList.module.scss";
import { getFirstLetterInUpperCase } from "../../helpers/utils";
var BoardInList = function (props) {
    return (_jsxs(_Fragment, { children: [_jsx(IconButton, { children: _jsx(Avatar, __assign({ className: styles.pictureAvatar, variant: "rounded" }, { children: _jsx("div", __assign({ className: styles.icon }, { children: getFirstLetterInUpperCase(props.name) })) })) }), _jsx(Typography, __assign({ variant: "button", color: "textSecondary" }, { children: props.name }))] }));
};
export default BoardInList;
