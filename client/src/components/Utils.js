"use strict";
exports.__esModule = true;
exports.isEmpty = void 0;
var isEmpty = function (value) {
    return (value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0));
};
exports.isEmpty = isEmpty;
