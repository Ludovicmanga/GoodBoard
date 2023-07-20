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
var _a;
import { createSlice } from "@reduxjs/toolkit";
var initialState = {
    user: undefined
};
export var loggedUserSlice = createSlice({
    name: "logged user",
    initialState: initialState,
    reducers: {
        setLoggedUserState: function (state, action) {
            state = __assign(__assign({}, state), action.payload);
            return state;
        },
        setEmail: function (state, action) {
            if (state.user) {
                state.user.email = action.payload;
            }
            return state;
        },
        addToVotedFeatures: function (state, action) {
            if (state.user) {
                state.user.voted = __spreadArray(__spreadArray([], state.user.voted, true), [action.payload.featureRequestId], false);
            }
            return state;
        },
        removeFromVotedFeatures: function (state, action) {
            if (state.user) {
                state.user.voted = state.user.voted.filter(function (featureRequestId) { return featureRequestId !== action.payload.featureRequestId; });
            }
            return state;
        }
    }
});
export var setLoggedUserState = (_a = loggedUserSlice.actions, _a.setLoggedUserState), setEmail = _a.setEmail, addToVotedFeatures = _a.addToVotedFeatures, removeFromVotedFeatures = _a.removeFromVotedFeatures;
export default loggedUserSlice.reducer;
