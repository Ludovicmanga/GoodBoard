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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var material_1 = require("@mui/material");
var CheckRounded_1 = __importDefault(require("@mui/icons-material/CheckRounded"));
var ArrowDropUpRounded_1 = __importDefault(require("@mui/icons-material/ArrowDropUpRounded"));
var react_1 = __importStar(require("react"));
var FeatureRequest_module_scss_1 = __importDefault(require("./FeatureRequest.module.scss"));
function FeatureRequest(_a) {
    var _b = (0, react_1.useState)(true), selected = _b[0], setSelected = _b[1];
    return (react_1["default"].createElement("div", { className: FeatureRequest_module_scss_1["default"].newFeatureRequestsBox },
        react_1["default"].createElement(material_1.Card, { sx: { minWidth: 275 } },
            react_1["default"].createElement(material_1.CardContent, null,
                react_1["default"].createElement("h3", { className: FeatureRequest_module_scss_1["default"].featureRequestTitle }, "Change the damn color"),
                react_1["default"].createElement("div", { className: FeatureRequest_module_scss_1["default"].featureRequestDescription }, "i want the app to be red"))),
        react_1["default"].createElement(material_1.ToggleButton, { value: "check", selected: selected, onChange: function () { return setSelected(!selected); } },
            react_1["default"].createElement("div", { className: FeatureRequest_module_scss_1["default"].votesBox },
                selected ?
                    react_1["default"].createElement("div", { className: FeatureRequest_module_scss_1["default"].iconContainer },
                        react_1["default"].createElement(CheckRounded_1["default"], { sx: { fontSize: 15 } })) : (react_1["default"].createElement("div", { className: FeatureRequest_module_scss_1["default"].iconContainer },
                    react_1["default"].createElement(ArrowDropUpRounded_1["default"], null))),
                react_1["default"].createElement("div", { className: FeatureRequest_module_scss_1["default"].voteCountContainer }, "250")))));
}
exports["default"] = FeatureRequest;
