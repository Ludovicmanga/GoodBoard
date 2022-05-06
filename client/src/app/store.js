"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var UserSlice_1 = __importDefault(require("../features/User/UserSlice"));
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        user: UserSlice_1["default"]
    }
});
