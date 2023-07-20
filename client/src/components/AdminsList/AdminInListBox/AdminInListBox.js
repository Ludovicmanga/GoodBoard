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
import { MenuItem, Select } from "@mui/material";
import styles from "./AdminInListBox.module.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { rolesList } from "../../../helpers/constants";
import { capitalizeFirstLetter } from "../../../helpers/utils";
var AdminInListBox = function (props) {
    return (_jsxs("div", __assign({ className: styles.container }, { children: [_jsx("div", { children: props.boardAdmin.email }), _jsx("div", { children: _jsx(Select, __assign({ size: "small", value: props.boardAdmin.role, label: "Role", onChange: function (e) {
                        return props.handleChangeUserRole(props.boardAdmin.email, e.target.value);
                    } }, { children: rolesList.map(function (role) { return (_jsx(MenuItem, __assign({ value: role }, { children: capitalizeFirstLetter(role) }))); }) })) }), _jsx("div", __assign({ className: styles.deleteBtnContainer, onClick: function () { return props.handleDeleteAdmin(props.boardAdmin.email); } }, { children: _jsx(AiOutlineDelete, { size: 20 }) }))] })));
};
export default AdminInListBox;
