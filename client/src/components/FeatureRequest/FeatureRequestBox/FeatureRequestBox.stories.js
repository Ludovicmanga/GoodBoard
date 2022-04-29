"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const FeatureRequestBox_1 = require("./FeatureRequestBox");
const react_1 = __importDefault(require("react"));
exports.default = {
    title: "UI/Feature-request",
    component: FeatureRequestBox_1.FeatureRequestBox
};
const Default = () => (react_1.default.createElement(FeatureRequestBox_1.FeatureRequestBox, { requestAuthorType: "user" }));
exports.Default = Default;
