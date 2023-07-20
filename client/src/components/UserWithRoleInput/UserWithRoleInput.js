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
import { MenuItem, OutlinedInput, Select, } from "@mui/material";
import styles from "./UserWithRoleInput.module.scss";
import { rolesList } from "../../helpers/constants";
var UserWithRoleInput = function (props) {
    var handleChangeAdminEmail = function (e) {
        props.setUsersToInviteList(function (currArray) {
            return currArray.map(function (userInArray) {
                if (userInArray.id === props.id) {
                    return __assign(__assign({}, userInArray), { email: e.target.value });
                }
                return userInArray;
            });
        });
    };
    var handleSelectedRole = function (e) {
        props.setUsersToInviteList(function (currArray) {
            return currArray.map(function (userInArray) {
                if (userInArray.id === props.id) {
                    return __assign(__assign({}, userInArray), { role: e.target.value });
                }
                return userInArray;
            });
        });
    };
    var foundAdmin = props.usersToInviteList.find(function (userToInvite) { return userToInvite.id === props.id; });
    return (_jsxs("div", __assign({ className: styles.container }, { children: [_jsx(OutlinedInput, { placeholder: "admin email", value: foundAdmin === null || foundAdmin === void 0 ? void 0 : foundAdmin.email, fullWidth: true, onChange: handleChangeAdminEmail, size: "small", className: styles.outlinedInput }), _jsx(Select, __assign({ value: foundAdmin === null || foundAdmin === void 0 ? void 0 : foundAdmin.role, fullWidth: true, onChange: handleSelectedRole, size: "small", className: "".concat(styles.outlinedInput, " ").concat(styles.roleInput) }, { children: rolesList.map(function (role) { return (_jsx(MenuItem, __assign({ value: role }, { children: role }))); }) }))] })));
};
export default UserWithRoleInput;
