"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.RoadMap = void 0;
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var FeatureRequestsBox_1 = require("../components/FeatureRequest/FeatureRequestsBox/FeatureRequestsBox");
var RoadMap = function (_a) {
    var handleCurrentPage = _a.handleCurrentPage;
    handleCurrentPage('Roadmap');
    var allFeatureRequests = (0, react_redux_1.useSelector)(function (state) { return state.allFeatureRequestsReducer; });
    return (react_1["default"].createElement("div", { className: 'roadmap--container' },
        react_1["default"].createElement("div", { className: 'roadmap--planned-column roadmap-column' },
            react_1["default"].createElement("div", { className: 'roadmap-column--title-container roadmap--planned-column--title-container' },
                react_1["default"].createElement("h2", { className: 'roadmap-column--title' }, "Pr\u00E9vu"),
                allFeatureRequests.map(function (featureRequest) {
                    if (featureRequest.status === "planned") {
                        return (react_1["default"].createElement(FeatureRequestsBox_1.FeatureRequestsBox, { key: featureRequest._id, title: featureRequest.title, details: featureRequest.details, votes: featureRequest.voters.length, featureRequestId: featureRequest._id, boxType: "roadmap" }));
                    }
                }))),
        react_1["default"].createElement("div", { className: 'roadmap--in-progress-column roadmap-column' },
            react_1["default"].createElement("div", { className: 'roadmap-column--title-container roadmap--in-progress-column--title-container' },
                react_1["default"].createElement("h2", { className: 'roadmap-column--title' }, "En cours")),
            allFeatureRequests.map(function (featureRequest) {
                if (featureRequest.status === "in-progress") {
                    return (react_1["default"].createElement(FeatureRequestsBox_1.FeatureRequestsBox, { key: featureRequest._id, title: featureRequest.title, details: featureRequest.details, votes: featureRequest.voters.length, featureRequestId: featureRequest._id, boxType: "roadmap" }));
                }
            })),
        react_1["default"].createElement("div", { className: 'roadmap--done-column roadmap-column' },
            react_1["default"].createElement("div", { className: 'roadmap-column--title-container roadmap--done-column--title-container' },
                react_1["default"].createElement("h2", { className: 'roadmap-column--title' }, "Termin\u00E9")),
            allFeatureRequests.map(function (featureRequest) {
                if (featureRequest.status === "done") {
                    return (react_1["default"].createElement(FeatureRequestsBox_1.FeatureRequestsBox, { key: featureRequest._id, title: featureRequest.title, details: featureRequest.details, votes: featureRequest.voters.length, featureRequestId: featureRequest._id, boxType: "roadmap" }));
                }
            }))));
};
exports.RoadMap = RoadMap;
