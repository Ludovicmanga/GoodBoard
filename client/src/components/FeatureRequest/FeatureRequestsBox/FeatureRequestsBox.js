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
exports.FeatureRequestsBox = void 0;
const react_1 = __importStar(require("react"));
const FeatureRequestsBox = ({}) => {
    const [isVotted, setIsVotted] = (0, react_1.useState)(false);
    const handleToggleVote = (e) => {
        e.preventDefault();
        setIsVotted(() => !isVotted);
    };
    return (react_1.default.createElement("div", { className: 'featureRequestBox' },
        react_1.default.createElement("div", { className: 'badge' },
            react_1.default.createElement("i", { className: "fa-solid fa-crown" })),
        react_1.default.createElement("div", { className: 'featureRequestBox--content' },
            react_1.default.createElement("h2", null, "Changer la taille du bouton"),
            react_1.default.createElement("p", null, "J'aimerais clairement que le bouton soit beaucoup, mais alors beaucoup plus gros... Ce serait g\u00E9nial")),
        react_1.default.createElement("a", { href: "#", onClick: (e) => handleToggleVote(e), className: 'featureRequestBox--votesCountBoxContainer' },
            react_1.default.createElement("div", { className: 'featureRequestBox--votesCountBox' },
                react_1.default.createElement("div", null, "255"),
                isVotted ? (react_1.default.createElement("i", { className: "fa-solid fa-check icon" })) : (react_1.default.createElement("i", { className: "fa-solid fa-angle-up icon" }))))));
};
exports.FeatureRequestsBox = FeatureRequestsBox;
