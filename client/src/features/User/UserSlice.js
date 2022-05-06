"use strict";
exports.__esModule = true;
exports.getUser = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    value: {}
};
var UserSlice = (0, toolkit_1.createSlice)({
    name: 'User',
    initialState: initialState,
    reducers: {
        getUser: function (state) {
            return state;
        }
    }
});
exports.getUser = UserSlice.actions.getUser;
exports["default"] = UserSlice.reducer;
