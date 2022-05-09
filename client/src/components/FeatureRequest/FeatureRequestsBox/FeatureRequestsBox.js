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
exports.FeatureRequestsBox = void 0;
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var react_redux_2 = require("react-redux");
var featureRequest_actions_1 = require("../../../actions/featureRequest.actions");
var FeatureRequestsBox = function (_a) {
    var title = _a.title, details = _a.details, votes = _a.votes, featureRequestId = _a.featureRequestId, boxType = _a.boxType;
    var _b = (0, react_1.useState)(false), isVoted = _b[0], setIsVoted = _b[1];
    var userData = (0, react_redux_2.useSelector)(function (state) { return state.userReducer; });
    var dispatch = (0, react_redux_1.useDispatch)();
    var handleToggleVote = function (e) {
        e.preventDefault();
        if (isVoted) {
            dispatch((0, featureRequest_actions_1.downVote)(featureRequestId, userData._id));
        }
        else {
            dispatch((0, featureRequest_actions_1.upVote)(featureRequestId, userData._id));
        }
        setIsVoted(function () { return !isVoted; });
    };
    return (react_1["default"].createElement("a", { href: '#', className: boxType == "roadmap" ? "featureRequestBox featureRequestBox-roadmap" : "featureRequestBox", onClick: function (e) {
            e.preventDefault();
        } },
        react_1["default"].createElement("div", { className: 'badge' },
            react_1["default"].createElement("i", { className: "fa-solid fa-crown" })),
        react_1["default"].createElement("div", { className: 'featureRequestBox--content-wrapper' },
            react_1["default"].createElement("div", { className: 'featureRequestBox--content' },
                react_1["default"].createElement("h2", null, title),
                react_1["default"].createElement("p", null, details)),
            react_1["default"].createElement("a", { href: "#", onClick: function (e) { return handleToggleVote(e); }, className: 'featureRequestBox--votesCountBoxContainer' }, isVoted ? (react_1["default"].createElement("div", { className: 'featureRequestBox--votesCountBox featureRequestBox--votesCountBox-voted' },
                react_1["default"].createElement("div", null, votes),
                react_1["default"].createElement("i", { className: "fa-solid fa-check icon" }))) : (react_1["default"].createElement("div", { className: 'featureRequestBox--votesCountBox featureRequestBox--votesCountBox-notVoted' },
                react_1["default"].createElement("div", null, votes),
                react_1["default"].createElement("i", { className: "fa-solid fa-angle-up icon" })))))));
};
exports.FeatureRequestsBox = FeatureRequestsBox;
