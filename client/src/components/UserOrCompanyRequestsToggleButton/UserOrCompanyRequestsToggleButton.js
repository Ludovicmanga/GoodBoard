"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOrCompanyRequestsToggleButton = void 0;
const react_1 = __importDefault(require("react"));
const UserOrCompanyRequestsToggleButton = ({ isToggled, onToggle }) => {
    return (react_1.default.createElement("label", { className: 'userCompanyRequestToggleButton' },
        react_1.default.createElement("input", { type: "checkbox", checked: isToggled, onChange: onToggle }),
        react_1.default.createElement("span", { className: 'slider' })));
};
exports.UserOrCompanyRequestsToggleButton = UserOrCompanyRequestsToggleButton;
