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
    var allCompanyFeatureRequests = (0, react_redux_1.useSelector)(function (state) { return state.allCompanyFeatureRequests; });
    var allUserFeatureRequests = (0, react_redux_1.useSelector)(function (state) { return state.allUserFeatureRequests; });
    if (allCompanyFeatureRequests.error | allUserFeatureRequests.error) {
        return react_1["default"].createElement("div", null, "erreur");
    }
    if ((0, Utils_1.isEmpty)(allCompanyFeatureRequests)) {
        return react_1["default"].createElement("div", null, "erreur");
    }
    if ((0, Utils_1.isEmpty)(allUserFeatureRequests)) {
        return react_1["default"].createElement("div", null, "erreur");
    }
    if (requestAuthorType === 'user') {
        return allUserFeatureRequests.map(function (userFeatureRequest) {
            return (react_1["default"].createElement(FeatureRequestsBox_1.FeatureRequestsBox, { key: userFeatureRequest._id, title: userFeatureRequest.title, details: userFeatureRequest.details, votes: userFeatureRequest.voters.length }));
        });
    }
    else if (requestAuthorType === 'company') {
        return allCompanyFeatureRequests.map(function (companyFeatureRequest) {
            return (react_1["default"].createElement(FeatureRequestsBox_1.FeatureRequestsBox, { key: companyFeatureRequest._id, title: companyFeatureRequest.title, details: companyFeatureRequest.details, votes: companyFeatureRequest.voters.length }));
        });
    }
    return null;
};
exports.FeatureRequestsContainer = FeatureRequestsContainer;
