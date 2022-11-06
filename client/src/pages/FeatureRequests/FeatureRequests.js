"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var NewFeatureRequestsButton_1 = __importDefault(require("../../components/buttons/NewFeatureRequestButton/NewFeatureRequestsButton"));
var hooks_1 = require("../../redux/hooks");
var FeatureRequestBox_1 = __importDefault(require("../../components/FeatureRequestBox/FeatureRequestBox"));
var react_1 = __importDefault(require("react"));
var SiteMainHeader_1 = __importDefault(require("../../components/Sections/SiteMainHeader/SiteMainHeader"));
var FeatureRequests = function (props) {
    var allFeatureRequests = (0, hooks_1.useAppSelector)(function (state) { return state.allFeatureRequests; });
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(SiteMainHeader_1["default"], null),
        allFeatureRequests.map(function (featureRequest) {
            if (featureRequest.creatorType === props.type) {
                return (react_1["default"].createElement(FeatureRequestBox_1["default"], { key: featureRequest._id, featureRequestProperties: featureRequest }));
            }
            else {
                return null;
            }
        }),
        react_1["default"].createElement(NewFeatureRequestsButton_1["default"], null)));
};
exports["default"] = FeatureRequests;
