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
import { Card, Chip } from "@mui/material";
import styles from "./IntegrationBox.module.scss";
var IntegrationBox = function (props) {
    return (_jsxs(Card, __assign({ className: styles.container }, { children: [_jsx("div", __assign({ className: styles.connectedBadgeContainer }, { children: props.connected && _jsx(Chip, { label: "Connected", variant: "outlined" }) })), _jsx("div", __assign({ className: styles.logoAndNameRowContainer }, { children: _jsx("div", __assign({ className: styles.logoAndNameContainer }, { children: _jsxs(_Fragment, { children: [_jsx("div", __assign({ className: styles.logoContainer }, { children: _jsx("img", { src: props.logo, alt: props.name, height: 50 }) })), _jsx("div", __assign({ className: styles.nameContainer }, { children: props.name }))] }) })) })), _jsx("div", __assign({ className: styles.descriptionContainer }, { children: props.description }))] })));
};
export default IntegrationBox;
