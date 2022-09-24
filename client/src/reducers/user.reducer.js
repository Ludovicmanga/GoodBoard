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
var user_actions_1 = require("../actions/user.actions");
var initialState = {
    voted: []
};
function userReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case user_actions_1.GET_USER:
            return action.payload;
        case featureRequest_actions_1.UP_VOTE_USER:
            return __assign(__assign({}, state), { voted: __spreadArray([action.payload.featureRequestId], state.voted, true) });
        case featureRequest_actions_1.DOWN_VOTE_USER:
            return __assign(__assign({}, state), { voted: state.voted.filter(function (id) { return id !== action.payload.featureRequestId; }) });
        default:
            return state;
    }
}
exports["default"] = userReducer;
