"use strict";
exports.__esModule = true;
exports.logUserIn = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    value: 0
};
var UserSlice = (0, toolkit_1.createSlice)({
    name: 'user',
    initialState: initialState,
    reducers: {
        logUserIn: function (state, action) {
            state.value += action.payload;
        }
    }
});
exports.logUserIn = UserSlice.actions.logUserIn;
exports["default"] = UserSlice.reducer;
