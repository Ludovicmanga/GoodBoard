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
import { createSlice } from "@reduxjs/toolkit";
var initialState = {
    activeBoard: null,
    featureRequestModalOpen: false,
    generalSettingsModalOpen: false,
    shareBoardModalOpen: false,
    manageBoardModalOpen: false,
    switchBoardModalOpen: false,
    cannotMakeActionModalOpen: false,
    menuSelected: null,
    mainSnackBar: {
        isOpen: false,
        message: ""
    },
    changeBoardColorModalOpen: false,
    colorMode: null,
    darkMode: null
};
export var generalPropertiesSlice = createSlice({
    name: "all feature requests",
    initialState: initialState,
    reducers: {
        setGeneralProperties: function (state, action) {
            state = __assign(__assign({}, state), action.payload);
            return state;
        }
    }
});
export var setGeneralProperties = generalPropertiesSlice.actions.setGeneralProperties;
export default generalPropertiesSlice.reducer;
