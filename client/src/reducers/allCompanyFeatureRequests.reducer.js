"use strict";
exports.__esModule = true;
var featureRequest_actions_1 = require("../actions/featureRequest.actions");
var initialState = {};
function allCompanyFeatureRequests(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case featureRequest_actions_1.GET_ALL_COMPANY_FEATURE_REQUESTS:
            return action.payload;
        default:
            return state;
    }
}
exports["default"] = allCompanyFeatureRequests;
