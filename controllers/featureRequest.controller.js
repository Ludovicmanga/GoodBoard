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
import featureRequestModel from "../models/featureRequest.model";
import userModel from "../models/user.model";
import topicModel from "../models/topic.model";
import featureTopicRelModel from "../models/featureTopicRelModel";
import { UserRoles } from "../helpers/types";
import boardModel from "../models/board.model";
import { getAllBoardFeatureRequestsMappedWithTopics } from "../helpers/featureRequests";
import { checkUserHasAccessToBoard } from "../helpers/boards";
import boardUserRelModel from "../models/boardUserRel.model";
export var getAllFeatureRequests = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, featureRequestModel
                    .find()
                    .then(function (allFeatureRequests) { return res.status(200).send(allFeatureRequests); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
export var getAllBoardFeatureRequests = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var activeBoard, mapped, userHasAccessToTheBoard, mapped, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 10, , 11]);
                return [4 /*yield*/, boardModel.findById(req.body.boardId)];
            case 1:
                activeBoard = _a.sent();
                if (!activeBoard) return [3 /*break*/, 9];
                if (!activeBoard.isPublic) return [3 /*break*/, 3];
                return [4 /*yield*/, getAllBoardFeatureRequestsMappedWithTopics(req.body.boardId)];
            case 2:
                mapped = _a.sent();
                res.status(200).send(mapped);
                return [3 /*break*/, 9];
            case 3:
                userHasAccessToTheBoard = void 0;
                if (!req.user) return [3 /*break*/, 5];
                return [4 /*yield*/, checkUserHasAccessToBoard(req.user.id, req.body.boardId)];
            case 4:
                userHasAccessToTheBoard = _a.sent();
                return [3 /*break*/, 6];
            case 5:
                userHasAccessToTheBoard = false;
                _a.label = 6;
            case 6:
                if (!userHasAccessToTheBoard) return [3 /*break*/, 8];
                return [4 /*yield*/, getAllBoardFeatureRequestsMappedWithTopics(req.body.boardId)];
            case 7:
                mapped = _a.sent();
                res.status(200).send(mapped);
                return [3 /*break*/, 9];
            case 8:
                res.send("user doesn't have access to the board");
                _a.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).send("Internal Server Error");
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
export var getAllCompanyFeatureRequests = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, featureRequestModel
                    .find({ creatorType: { $in: [UserRoles.admin, UserRoles.member] } })
                    .then(function (allCompanyFeatureRequests) {
                    return res.status(200).send(allCompanyFeatureRequests);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
export var getAllUserFeatureRequests = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, featureRequestModel
                    .find({ creatorType: UserRoles.externalUser })
                    .then(function (allUserFeatureRequests) {
                    return res.status(200).send(allUserFeatureRequests);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
export var updateFeatureRequest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, details, creatorType, status_1, creator, topics, updated_1, topicIds, _i, topics_1, topicTitle, topic, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 10, , 11]);
                _a = req.body.featureRequest, title = _a.title, details = _a.details, creatorType = _a.creatorType, status_1 = _a.status, creator = _a.creator, topics = _a.topics;
                if (!(req.body.featureRequest._id.length > 0)) return [3 /*break*/, 9];
                return [4 /*yield*/, featureRequestModel.findOneAndUpdate({ _id: req.body.featureRequest._id }, {
                        title: title,
                        details: details,
                        creatorType: creatorType,
                        status: status_1,
                        creator: creator
                    }, {
                        "new": true
                    })];
            case 1:
                updated_1 = _b.sent();
                if (!updated_1) return [3 /*break*/, 9];
                if (!(topics.length > 0)) return [3 /*break*/, 8];
                topicIds = [];
                _i = 0, topics_1 = topics;
                _b.label = 2;
            case 2:
                if (!(_i < topics_1.length)) return [3 /*break*/, 5];
                topicTitle = topics_1[_i];
                return [4 /*yield*/, topicModel.findOneAndUpdate({ title: topicTitle }, { title: topicTitle }, { upsert: true, "new": true })];
            case 3:
                topic = _b.sent();
                // Push the topic ID to the array
                topicIds.push(topic._id);
                _b.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: 
            // Update the feature-topic relationships
            return [4 /*yield*/, featureTopicRelModel.deleteMany({ feature: updated_1._id })];
            case 6:
                // Update the feature-topic relationships
                _b.sent();
                return [4 /*yield*/, featureTopicRelModel.insertMany(topicIds.map(function (topicId) { return ({
                        feature: updated_1._id,
                        topic: topicId
                    }); }))];
            case 7:
                _b.sent();
                _b.label = 8;
            case 8:
                res.send(updated_1);
                _b.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                e_1 = _b.sent();
                console.log(e_1, " is the error");
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
export var createFeatureRequest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var featureRequestData, foundUserBoardRel, newFeatureRequest, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                featureRequestData = req.body.featureRequest;
                return [4 /*yield*/, boardUserRelModel.findOne({
                        user: req.user.id,
                        board: req.body.boardId
                    })];
            case 1:
                foundUserBoardRel = _a.sent();
                newFeatureRequest = new featureRequestModel({
                    title: featureRequestData.title,
                    details: featureRequestData.details,
                    creatorType: foundUserBoardRel.userRole,
                    status: featureRequestData.status,
                    creator: req.user.id,
                    board: req.body.boardId
                });
                newFeatureRequest
                    .save()
                    .then(function (featureRequest) { return res.status(200).send(featureRequest); })["catch"](function (error) { return console.log(error); });
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                console.log(e_2, " is the error message");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var upVote = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedFeatureRequest;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, featureRequestModel.updateOne({ _id: req.params.id }, { $addToSet: { voters: req.body.userId } })];
            case 1:
                updatedFeatureRequest = _a.sent();
                return [4 /*yield*/, userModel.updateOne({ _id: req.body.userId }, { $addToSet: { voted: req.params.id } })];
            case 2:
                _a.sent();
                res.status(200).json({ updatedFeatureRequest: updatedFeatureRequest });
                return [2 /*return*/];
        }
    });
}); };
export var downVote = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedFeatureRequest;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, featureRequestModel.updateOne({ _id: req.params.id }, { $pull: { voters: req.body.userId } })];
            case 1:
                updatedFeatureRequest = _a.sent();
                return [4 /*yield*/, userModel.updateOne({ _id: req.body.userId }, { $pull: { voted: req.params.id } })];
            case 2:
                _a.sent();
                res.status(200).json({ updatedFeatureRequest: updatedFeatureRequest });
                return [2 /*return*/];
        }
    });
}); };
export var deleteFeatureRequest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, featureRequestModel.findOneAndDelete({
                    _id: req.body.featureRequestId
                })];
            case 1:
                _a.sent();
                res.json({
                    deleted: true
                });
                return [2 /*return*/];
        }
    });
}); };
