"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureRequestsContainer = void 0;
const react_1 = __importDefault(require("react"));
const FeatureRequestsBox_1 = require("../FeatureRequestsBox/FeatureRequestsBox");
const FeatureRequestsContainer = ({ requestAuthorType }) => {
    if (requestAuthorType === 'user') {
        return (react_1.default.createElement(FeatureRequestsBox_1.FeatureRequestsBox, null));
    }
    else if (requestAuthorType === 'company') {
        return (react_1.default.createElement(FeatureRequestsBox_1.FeatureRequestsBox, null));
    }
    else
        return (react_1.default.createElement("div", null, "Problemo"));
};
exports.FeatureRequestsContainer = FeatureRequestsContainer;
