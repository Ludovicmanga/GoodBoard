"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var featureRequestModel = require('../models/featureRequest.model');
var ObjectId = require('mongoose').Types.ObjectId;
var userModel = require('../models/user.model');
module.exports.getAllFeatureRequests = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, featureRequestModel.find()
                    .then(function (allFeatureRequests) { return res.status(200).send(allFeatureRequests); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
module.exports.getAllCompanyFeatureRequests = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, featureRequestModel.find({ creatorType: "company" })
                    .then(function (allCompanyFeatureRequests) { return res.status(200).send(allCompanyFeatureRequests); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
module.exports.getAllUserFeatureRequests = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, featureRequestModel.find({ creatorType: "user" })
                    .then(function (allUserFeatureRequests) { return res.status(200).send(allUserFeatureRequests); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
module.exports.createFeatureRequest = function (req, res) {
    var newFeatureRequest = new featureRequestModel({
        title: req.body.title,
        details: req.body.details,
        creatorType: req.body.creatorType,
        status: req.body.status,
        creator: req.body.creator
    });
    newFeatureRequest.save()
        .then(function (featureRequest) { return res.status(200).send(featureRequest); })["catch"](function (error) { return console.log(error); });
};
module.exports.upVote = function (req, res) {
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.userId))
        return res.status(400).send("ID unknown : " + req.params.id);
    featureRequestModel.updateOne({ _id: req.params.id }, { $addToSet: { voters: req.body.userId } })
        .then(function (featureRequest) { return res.status(200).send(featureRequest); })["catch"](function (error) { return res.status(200).json({ error: error }); });
    userModel.updateOne({ _id: req.body.userId }, { $addToSet: { voted: req.params.id } })["catch"](function (error) { return res.status(200).json({ error: error }); });
};
module.exports.downVote = function (req, res) {
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.userId))
        return res.status(400).send("ID unknown : " + req.params.id);
    featureRequestModel.updateOne({ _id: req.params.id }, { $pull: { voters: req.body.userId } })
        .then(function (featureRequest) { return res.status(200).send(featureRequest); })["catch"](function (error) { return res.status(400).json({ error: error }); });
    userModel.updateOne({ _id: req.body.userId }, { $pull: { voted: req.params.id } })["catch"](function (error) { return res.status(400).json({ error: error }); });
};
