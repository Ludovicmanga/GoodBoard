"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const FeatureRequestsBox_1 = require("./FeatureRequestsBox");
exports.default = {
    title: "UI/Feature requests Box",
    component: FeatureRequestsBox_1.FeatureRequestsBox
};
const Default = () => (react_1.default.createElement(FeatureRequestsBox_1.FeatureRequestsBox, null));
exports.Default = Default;
