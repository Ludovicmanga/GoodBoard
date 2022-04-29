"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const VotesButton_1 = require("./VotesButton");
const react_1 = __importDefault(require("react"));
exports.default = {
    title: "UI/Votes",
    component: VotesButton_1.VotesButton
};
const Default = () => {
    return (react_1.default.createElement(VotesButton_1.VotesButton, null));
};
exports.Default = Default;
