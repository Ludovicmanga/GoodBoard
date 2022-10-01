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
exports.Home = void 0;
var react_1 = __importStar(require("react"));
var FeatureRequestsContainer_1 = require("../components/FeatureRequest/FeatureRequestContainer/FeatureRequestsContainer");
var NewFeatureRequestModal_1 = require("../components/NewFeatureRequest/NewFeatureRequestModal/NewFeatureRequestModal");
var Home = function (_a) {
    var handleCurrentPage = _a.handleCurrentPage;
    handleCurrentPage('Feature requests');
    var _b = (0, react_1.useState)(false), isToggled = _b[0], setIsToggled = _b[1];
    var _c = (0, react_1.useState)(false), newFeatureRequestModalisOpen = _c[0], setNewFeatureRequestModalisOpen = _c[1];
    var handleCloseModal = function (newFeatureRequestModalState) {
        setNewFeatureRequestModalisOpen(function () { return newFeatureRequestModalState; });
    };
    return (react_1["default"].createElement("div", null,
        isToggled ? (react_1["default"].createElement(FeatureRequestsContainer_1.FeatureRequestsContainer, { requestAuthorType: 'admin' })) : (react_1["default"].createElement(FeatureRequestsContainer_1.FeatureRequestsContainer, { requestAuthorType: 'user' })),
        newFeatureRequestModalisOpen && (react_1["default"].createElement(NewFeatureRequestModal_1.NewFeatureRequestModal, { handleCloseModal: handleCloseModal })),
        react_1["default"].createElement("div", { className: 'newFeatureRequestModalOpenButton--container' },
            react_1["default"].createElement("button", { className: 'newFeatureRequestModalOpenButton', onClick: function () { return setNewFeatureRequestModalisOpen(!newFeatureRequestModalisOpen); } },
                react_1["default"].createElement("i", { className: "fa-solid fa-plus newFeatureRequestModalOpenButton--icon" }),
                react_1["default"].createElement("div", { className: 'newFeatureRequestModalOpenButton--text' }, "Faire une proposition")))));
};
exports.Home = Home;
exports["default"] = exports.Home;
