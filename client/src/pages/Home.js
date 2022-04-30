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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const FeatureRequestsContainer_1 = require("../components/FeatureRequest/FeatureRequestContainer/FeatureRequestsContainer");
const NewFeatureRequestModal_1 = require("../components/NewFeatureRequest/NewFeatureRequestModal/NewFeatureRequestModal");
const UserOrCompanyRequestsToggleButton_1 = require("../components/UserOrCompanyRequestsToggleButton/UserOrCompanyRequestsToggleButton");
const Home = () => {
    const [isToggled, setIsToggled] = (0, react_1.useState)(false);
    const [newFeatureRequestModalisOpen, setNewFeatureRequestModalisOpen] = (0, react_1.useState)(false);
    const handleCloseModal = (newFeatureRequestModalState) => {
        setNewFeatureRequestModalisOpen(() => newFeatureRequestModalState);
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, "Vous avez des id\u00E9es ? Nous vous \u00E9coutons !"),
        react_1.default.createElement("div", { className: 'UserOrCompanyRequestsToggleButton--container' },
            react_1.default.createElement("div", { className: 'contextualText' }, "Vos id\u00E9es"),
            react_1.default.createElement(UserOrCompanyRequestsToggleButton_1.UserOrCompanyRequestsToggleButton, { isToggled: isToggled, onToggle: () => setIsToggled(!isToggled) }),
            react_1.default.createElement("div", { className: 'contextualText' }, "Nos id\u00E9es")),
        isToggled ? (react_1.default.createElement(FeatureRequestsContainer_1.FeatureRequestsContainer, { requestAuthorType: 'company' })) : (react_1.default.createElement(FeatureRequestsContainer_1.FeatureRequestsContainer, { requestAuthorType: 'user' })),
        newFeatureRequestModalisOpen && (react_1.default.createElement(NewFeatureRequestModal_1.NewFeatureRequestModal, { handleCloseModal: handleCloseModal })),
        react_1.default.createElement("button", { onClick: () => setNewFeatureRequestModalisOpen(!newFeatureRequestModalisOpen) }, "Nouvelle feature request")));
};
exports.default = Home;
