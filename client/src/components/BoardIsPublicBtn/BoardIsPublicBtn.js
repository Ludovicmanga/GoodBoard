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
import { Switch } from "antd";
import styles from "./BoardIsPublicBtn.module.scss";
var BoardIsPublicBtn = function (props) {
    return (_jsxs("div", __assign({ className: styles.container }, { children: [_jsx("div", { children: props.boardIsPublic ? "Board is public" : "Board is private" }), _jsx("div", __assign({ className: styles.switchContainer }, { children: _jsx(Switch, { loading: props.isLoading, checked: props.boardIsPublic, onChange: props.handleChangeBoardStatus }) }))] })));
};
export default BoardIsPublicBtn;
