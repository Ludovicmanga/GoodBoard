"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const NewFeatureRequestModal_1 = require("./NewFeatureRequestModal");
const handleCloseModal = (newFeatureRequestModalState) => {
    return false;
};
exports.default = {
    title: 'UI/ New Feature Request Modal',
    component: NewFeatureRequestModal_1.NewFeatureRequestModal
};
const Default = () => {
    return react_1.default.createElement(NewFeatureRequestModal_1.NewFeatureRequestModal, { handleCloseModal: handleCloseModal });
};
exports.Default = Default;
