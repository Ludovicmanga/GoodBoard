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
import { createSlice } from '@reduxjs/toolkit';
var initialState = [];
export var allFeatureRequestsSlice = createSlice({
    name: 'all feature requests',
    initialState: initialState,
    reducers: {
        setAllFeatureRequests: function (state, action) {
            state = action.payload;
            return state;
        },
        upVote: function (state, action) {
            return state.map(function (featureRequest) { return (featureRequest._id === action.payload.featureRequestId ? __assign(__assign({}, featureRequest), { voters: __spreadArray([action.payload.userId], featureRequest.voters, true) }) : featureRequest); });
        },
        downVote: function (state, action) {
            return state.map(function (featureRequest) { return (featureRequest._id === action.payload.featureRequestId ? __assign(__assign({}, featureRequest), { voters: featureRequest.voters.filter(function (voter) { return voter !== action.payload.userId; }) }) : featureRequest); });
        },
        addFeatureRequest: function (state, action) {
            return __spreadArray(__spreadArray([], state, true), [action.payload.featureRequest], false);
        },
        deleteFeatureRequest: function (state, action) {
            return state.filter(function (featureRequest) { return featureRequest._id !== action.payload.featureRequest._id; });
        },
        updateFeatureRequest: function (state, action) {
            return state.map(function (featureRequest) {
                if (featureRequest._id === action.payload.featureRequestToUpdate._id) {
                    featureRequest = action.payload.featureRequestToUpdate;
                    return featureRequest;
                }
                else {
                    return featureRequest;
                }
            });
        }
    }
});
export var upVote = (_a = allFeatureRequestsSlice.actions, _a.upVote), downVote = _a.downVote, setAllFeatureRequests = _a.setAllFeatureRequests, addFeatureRequest = _a.addFeatureRequest, deleteFeatureRequest = _a.deleteFeatureRequest, updateFeatureRequest = _a.updateFeatureRequest;
export default allFeatureRequestsSlice.reducer;
