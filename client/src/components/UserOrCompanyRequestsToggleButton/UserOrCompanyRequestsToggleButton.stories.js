"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.Default = void 0;
var react_1 = __importStar(require("react"));
var UserOrCompanyRequestsToggleButton_1 = require("./UserOrCompanyRequestsToggleButton");
exports["default"] = {
    title: 'UI/User or company requests toggle button',
    component: UserOrCompanyRequestsToggleButton_1.UserOrCompanyRequestsToggleButton
};
var Default = function () {
    var _a = (0, react_1.useState)(false), isToggled = _a[0], setIsToggled = _a[1];
    return react_1["default"].createElement(UserOrCompanyRequestsToggleButton_1.UserOrCompanyRequestsToggleButton, { isToggled: isToggled, onToggle: function () { return setIsToggled(!isToggled); } });
};
exports.Default = Default;
