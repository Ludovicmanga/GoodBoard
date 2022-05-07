"use strict";
exports.__esModule = true;
var user_actions_1 = require("../actions/user.actions");
var initialState = {};
function userReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case user_actions_1.GET_USER:
            return action.payload;
        default:
            return state;
    }
}
exports["default"] = userReducer;
