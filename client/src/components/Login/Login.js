"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var Login_module_scss_1 = __importDefault(require("./Login.module.scss"));
var Avatar_1 = __importDefault(require("@mui/material/Avatar"));
var Button_1 = __importDefault(require("@mui/material/Button"));
var TextField_1 = __importDefault(require("@mui/material/TextField"));
var FormControlLabel_1 = __importDefault(require("@mui/material/FormControlLabel"));
var Checkbox_1 = __importDefault(require("@mui/material/Checkbox"));
var Link_1 = __importDefault(require("@mui/material/Link"));
var Grid_1 = __importDefault(require("@mui/material/Grid"));
var Box_1 = __importDefault(require("@mui/material/Box"));
var LockOutlined_1 = __importDefault(require("@mui/icons-material/LockOutlined"));
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var Container_1 = __importDefault(require("@mui/material/Container"));
var Login = function (props) {
    return (react_1["default"].createElement("div", { className: Login_module_scss_1["default"].container },
        react_1["default"].createElement(Container_1["default"], { component: "main", maxWidth: "xs" },
            react_1["default"].createElement(Box_1["default"], { sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                } },
                react_1["default"].createElement(Avatar_1["default"], { sx: { m: 1, bgcolor: 'secondary.main' } },
                    react_1["default"].createElement(LockOutlined_1["default"], null)),
                react_1["default"].createElement(Typography_1["default"], { component: "h1", variant: "h5" }, "Sign in"),
                react_1["default"].createElement(Box_1["default"], { component: "form", noValidate: true, sx: { mt: 1 } },
                    react_1["default"].createElement(TextField_1["default"], { margin: "normal", required: true, fullWidth: true, id: "email", label: "Email Address", name: "email", autoComplete: "email", autoFocus: true }),
                    react_1["default"].createElement(TextField_1["default"], { margin: "normal", required: true, fullWidth: true, name: "password", label: "Password", type: "password", id: "password", autoComplete: "current-password" }),
                    react_1["default"].createElement(FormControlLabel_1["default"], { control: react_1["default"].createElement(Checkbox_1["default"], { value: "remember", color: "primary" }), label: "Remember me" }),
                    react_1["default"].createElement(Button_1["default"], { type: "submit", fullWidth: true, variant: "contained", sx: { mt: 3, mb: 2 } }, "Sign In"),
                    react_1["default"].createElement(Grid_1["default"], { container: true },
                        react_1["default"].createElement(Grid_1["default"], { item: true, xs: true },
                            react_1["default"].createElement(Link_1["default"], { href: "#", variant: "body2" }, "Forgot password?")),
                        react_1["default"].createElement(Grid_1["default"], { item: true },
                            react_1["default"].createElement(Link_1["default"], { href: "#", variant: "body2" }, "Don't have an account? Sign Up"))))))));
};
exports["default"] = Login;
