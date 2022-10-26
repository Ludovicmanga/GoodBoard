"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.AxiosInst = void 0;
var axios_1 = __importDefault(require("axios"));
var BASE_URL = process.env.NEXT_PUBLIC_BACK_BASE_URL || 'http://localhost:8080';
var AxiosInst = /** @class */ (function () {
    function AxiosInst() {
    }
    AxiosInst.getInst = function () {
        if (!AxiosInst.inst) {
            AxiosInst.inst = axios_1["default"].create({
                withCredentials: true,
                baseURL: BASE_URL
            });
        }
        return AxiosInst.inst;
    };
    return AxiosInst;
}());
exports.AxiosInst = AxiosInst;
