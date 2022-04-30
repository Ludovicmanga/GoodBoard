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
exports.MenuChoiceNavBar = void 0;
const react_1 = __importStar(require("react"));
const MenuChoiceModal_1 = require("../../MenuChoiceModal/MenuChoiceModal");
const MenuChoiceNavBar = ({}) => {
    const [isToggled, setIsToggled] = (0, react_1.useState)(false);
    const handleToggle = (e) => {
        e.preventDefault();
        setIsToggled(() => !isToggled);
    };
    return (react_1.default.createElement("nav", { className: 'menuChoiceNavBar' },
        react_1.default.createElement("div", null,
            react_1.default.createElement("ul", { className: 'menuChoiceNavbar--liWrapper' },
                react_1.default.createElement("a", { href: '#', onClick: (e) => handleToggle(e) },
                    react_1.default.createElement("li", { className: 'menuChoiceli' },
                        isToggled ? (react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement("i", { className: "fa-solid fa-angle-down icon" }),
                            react_1.default.createElement(MenuChoiceModal_1.MenuChoiceModal, null))) : (react_1.default.createElement("i", { className: "fa-solid fa-angle-right icon" })),
                        "Feature requests")),
                react_1.default.createElement("li", null,
                    react_1.default.createElement("i", { className: "fa-solid fa-magnifying-glass icon" }),
                    react_1.default.createElement("input", { className: 'menuChoiceNavbar--searchInput', placeholder: 'Search' }))))));
};
exports.MenuChoiceNavBar = MenuChoiceNavBar;
