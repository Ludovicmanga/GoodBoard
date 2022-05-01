"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Default = void 0;
var react_1 = __importDefault(require("react"));
var NewFeatureRequestModal_1 = require("./NewFeatureRequestModal");
var handleCloseModal = function (newFeatureRequestModalState) {
    return false;
};
exports["default"] = {
    title: 'UI/ New Feature Request Modal',
    component: NewFeatureRequestModal_1.NewFeatureRequestModal
};
var Default = function () {
    return react_1["default"].createElement(NewFeatureRequestModal_1.NewFeatureRequestModal, { handleCloseModal: handleCloseModal });
};
exports.Default = Default;
