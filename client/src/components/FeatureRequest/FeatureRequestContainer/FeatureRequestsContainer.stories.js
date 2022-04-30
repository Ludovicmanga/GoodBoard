"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const FeatureRequestsContainer_1 = require("./FeatureRequestsContainer");
exports.default = {
    title: "UI/Feature requests container",
    component: FeatureRequestsContainer_1.FeatureRequestsContainer
};
const Default = () => (react_1.default.createElement(FeatureRequestsContainer_1.FeatureRequestsContainer, { requestAuthorType: "user" }));
exports.Default = Default;
