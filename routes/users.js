"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var user_controller_1 = require("../controllers/user.controller");
var router = (0, express_1["default"])();
router.post('/login', passport_1["default"].authenticate('local'), user_controller_1.getUser);
exports["default"] = router;
