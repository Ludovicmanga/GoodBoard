"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.FeatureRequestsContainer = void 0;
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var FeatureRequestsBox_1 = require("../FeatureRequestsBox/FeatureRequestsBox");
var Utils_1 = require("../../Utils");
var FeatureRequestsContainer = function (_a) {
    var requestAuthorType = _a.requestAuthorType;
    var allFeatureRequests = (0, react_redux_1.useSelector)(function (state) { return state.allFeatureRequestsReducer; });
    if ((0, Utils_1.isEmpty)(allFeatureRequests)) {
        return react_1["default"].createElement("div", null, "erreur");
    }
    if (requestAuthorType === 'user') {
        return allFeatureRequests.map(function (featureRequest) {
            if (featureRequest.creatorType === 'user') {
                return (react_1["default"].createElement(FeatureRequestsBox_1.FeatureRequestsBox, { key: featureRequest._id, title: featureRequest.title, details: featureRequest.details, votes: featureRequest.voters.length, featureRequestId: featureRequest._id }));
            }
        });
    }
    else if (requestAuthorType === 'company') {
        return allFeatureRequests.map(function (featureRequest) {
            if (featureRequest.creatorType == "company") {
                return (react_1["default"].createElement(FeatureRequestsBox_1.FeatureRequestsBox, { key: featureRequest._id, title: featureRequest.title, details: featureRequest.details, votes: featureRequest.voters.length, featureRequestId: featureRequest._id }));
            }
        });
    }
    return null;
};
exports.FeatureRequestsContainer = FeatureRequestsContainer;
