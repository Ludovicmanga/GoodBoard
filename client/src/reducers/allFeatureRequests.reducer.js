"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var featureRequest_actions_1 = require("../actions/featureRequest.actions");
var initialState = {};
function allFeatureRequestsReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case featureRequest_actions_1.GET_ALL_FEATURE_REQUESTS:
            return action.payload;
        case featureRequest_actions_1.UP_VOTE_FEATURE:
            return state.map(function (featureRequest) {
                if (featureRequest._id === action.payload.featureRequestId) {
                    return __assign(__assign({}, featureRequest), { voters: __spreadArray([action.payload.userId], featureRequest.voters, true) });
                }
                return featureRequest;
            });
        case featureRequest_actions_1.DOWN_VOTE_FEATURE:
            return state.map(function (featureRequest) {
                if (featureRequest._id === action.payload.featureRequestId) {
                    return __assign(__assign({}, featureRequest), { voters: featureRequest.voters.filter(function (id) { return id !== action.payload.userId; }) });
                }
                return featureRequest;
            });
        default:
            return state;
    }
}
exports["default"] = allFeatureRequestsReducer;
