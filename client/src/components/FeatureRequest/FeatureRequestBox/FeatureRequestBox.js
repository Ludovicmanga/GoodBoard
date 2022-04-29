"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureRequestBox = void 0;
const react_1 = __importDefault(require("react"));
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const FeatureRequestBox = ({ requestAuthorType }) => {
    return (react_1.default.createElement("div", { className: 'featureRequestBox' },
        react_1.default.createElement("div", { className: 'badge' },
            react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: ['fas', 'crown'] })),
        react_1.default.createElement("div", { className: 'featureRequestBox--content' },
            react_1.default.createElement("h2", null, "Changer la taille du bouton"),
            react_1.default.createElement("p", null, "J'aimerais clairement que le bouton soit beaucoup, mais alors beaucoup plus gros... Ce serait g\u00E9nial"),
            react_1.default.createElement("p", null, "Internet")),
        react_1.default.createElement("div", { className: 'featureRequestBox--votesCountBox' },
            react_1.default.createElement("a", { href: '#' },
                react_1.default.createElement("i", { className: "fa-solid fa-angle-up icon" })),
            react_1.default.createElement("div", null, "255"),
            react_1.default.createElement("a", { href: '#' },
                react_1.default.createElement("i", { className: "fa-solid fa-angle-down icon" })))));
};
exports.FeatureRequestBox = FeatureRequestBox;
