"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var allFeatureRequestsSlice_1 = __importDefault(require("./features/allFeatureRequestsSlice"));
var generalPropertiesSlice_1 = __importDefault(require("./features/generalPropertiesSlice"));
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        generalProperties: generalPropertiesSlice_1["default"],
        allFeatureRequests: allFeatureRequestsSlice_1["default"]
    }
});
