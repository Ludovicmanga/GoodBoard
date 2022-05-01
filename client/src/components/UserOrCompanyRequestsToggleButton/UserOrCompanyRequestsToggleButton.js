"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.UserOrCompanyRequestsToggleButton = void 0;
var react_1 = __importDefault(require("react"));
var UserOrCompanyRequestsToggleButton = function (_a) {
    var isToggled = _a.isToggled, onToggle = _a.onToggle;
    return (react_1["default"].createElement("label", { className: 'userCompanyRequestToggleButton' },
        react_1["default"].createElement("input", { type: "checkbox", checked: isToggled, onChange: onToggle }),
        react_1["default"].createElement("span", { className: 'slider' })));
};
exports.UserOrCompanyRequestsToggleButton = UserOrCompanyRequestsToggleButton;
