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
import boardModel from "../models/board.model";
import boardUserRelModel from "../models/boardUserRel.model";
import { getAllBoardFeatureRequestsHelper } from "../helpers/featureRequests";
import { secretKey, verifyJwtToken, websiteUrl } from "../helpers/auth";
import { UserRoles } from "../helpers/types";
import userModel from "../models/user.model";
import { checkUserHasAccessToBoard, giveAccessToBoard, sendEmailToUser } from "../helpers/boards";
import { generateStrongPassword } from "../utils/utils";
export var updateColor = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, themeColor, boardId, updatedBoard, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, themeColor = _a.themeColor, boardId = _a.boardId;
                return [4 /*yield*/, boardModel.findOneAndUpdate({ _id: boardId }, {
                        themeColor: themeColor
                    }, {
                        "new": true
                    })];
            case 1:
                updatedBoard = _b.sent();
                res.status(200).send(updatedBoard.themeColor);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _b.sent();
                console.log(e_1, " is the error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var getBoard = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var foundBoard, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, boardModel.find({ _id: req.params.boardId })];
            case 1:
                foundBoard = _a.sent();
                res.status(200).send(foundBoard[0]);
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                console.log(e_2, " is the error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var getUserBoards = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var boardsIds, boardsLinkedToUser, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.user) return [3 /*break*/, 5];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, boardUserRelModel
                        .find({ user: req.user.id })
                        .then(function (boardUserRels) {
                        return boardUserRels.map(function (boardUserRel) { return boardUserRel.board; });
                    })];
            case 2:
                boardsIds = _a.sent();
                return [4 /*yield*/, boardModel.find({
                        _id: {
                            $in: boardsIds
                        }
                    })];
            case 3:
                boardsLinkedToUser = _a.sent();
                res.status(200).send(boardsLinkedToUser);
                return [3 /*break*/, 5];
            case 4:
                e_3 = _a.sent();
                console.log(e_3, " is the error");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
export var createBoard = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newBoard, newBoardUserRelation;
    return __generator(this, function (_a) {
        try {
            if (req.user) {
                newBoard = new boardModel({
                    name: req.body.name,
                    description: req.body.description,
                    themeColor: req.body.themeColor,
                    isPublic: req.body.boardIsPublic
                });
                newBoard
                    .save()
                    .then(function (savedObject) {
                    //const token = generateJwtToken(savedObject.id, secretKey);
                    savedObject.url = "".concat(websiteUrl, "/view-board/").concat(savedObject.id);
                    savedObject.save();
                })["catch"](function (error) { return console.log(error); });
                newBoardUserRelation = new boardUserRelModel({
                    user: req.user.id,
                    board: newBoard.id,
                    userRole: UserRoles.admin
                });
                newBoardUserRelation.save()["catch"](function (error) { return console.log(error); });
                res.send(newBoard);
            }
            else {
                console.log("user not logged in");
            }
        }
        catch (e) {
            console.log(e, " is the error");
        }
        return [2 /*return*/];
    });
}); };
export var getShareUrl = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var foundBoard, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, boardModel.findOne({ _id: req.body.boardId })];
            case 1:
                foundBoard = _a.sent();
                if (foundBoard) {
                    res.status(200).send({ url: foundBoard.url });
                }
                else {
                    res.status(200).send({ url: '' });
                }
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                console.log(e_4, " is the error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var getPublicBoard = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var boardId, boardFeatureRequests, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                boardId = verifyJwtToken(req.params.token, secretKey);
                if (!boardId) return [3 /*break*/, 2];
                return [4 /*yield*/, getAllBoardFeatureRequestsHelper(boardId)];
            case 1:
                boardFeatureRequests = _a.sent();
                res.status(200).send(boardFeatureRequests);
                return [3 /*break*/, 3];
            case 2:
                new Error("no board id found");
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                e_5 = _a.sent();
                console.log(e_5, " is the error");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
export var uploadImage = function (req, res) {
    console.log("I will upload the image ", req.body);
};
export var updatePublicStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedBoard, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, boardModel.findOneAndUpdate({ _id: req.body.activeBoard }, {
                        isPublic: req.body.publicStatus
                    }, {
                        "new": true
                    })];
            case 1:
                updatedBoard = _a.sent();
                if (updatedBoard) {
                    res.send(req.body.publicStatus);
                }
                return [3 /*break*/, 3];
            case 2:
                e_6 = _a.sent();
                console.log(e_6, "is the error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var getPublicStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var foundBoardStatus, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, boardModel
                        .findById(req.body.activeBoard)
                        .select("isPublic")];
            case 1:
                foundBoardStatus = _a.sent();
                if (foundBoardStatus) {
                    res.send(foundBoardStatus.isPublic);
                }
                return [3 /*break*/, 3];
            case 2:
                e_7 = _a.sent();
                console.log(e_7, "is the error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var deleteUserFromBoard = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userFound, deletedUser, e_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, userModel.findOne({ email: req.body.userEmail })];
            case 1:
                userFound = _a.sent();
                return [4 /*yield*/, boardUserRelModel.findOneAndDelete({
                        user: userFound._id,
                        board: req.body.boardId
                    })];
            case 2:
                deletedUser = _a.sent();
                if (deletedUser) {
                    res.send("deleted");
                }
                return [3 /*break*/, 4];
            case 3:
                e_8 = _a.sent();
                console.log(e_8, " is the error");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var updateUserRole = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userFound, updatedUser, e_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, userModel.findOne({ email: req.body.userEmail })];
            case 1:
                userFound = _a.sent();
                return [4 /*yield*/, boardUserRelModel.findOneAndUpdate({
                        user: userFound._id,
                        board: req.body.boardId
                    }, {
                        userRole: req.body.role
                    }, { "new": true })];
            case 2:
                updatedUser = _a.sent();
                if (updatedUser) {
                    res.status(200).send(updatedUser);
                }
                return [3 /*break*/, 4];
            case 3:
                e_9 = _a.sent();
                console.log(e_9, " is the error");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var getBoardUsersList = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var boardUserRels_1, userIds, usersLinkedToBoard, usersMappedWithRole, e_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, boardUserRelModel.find({
                        board: req.params.boardId
                    })];
            case 1:
                boardUserRels_1 = _a.sent();
                userIds = boardUserRels_1.map(function (boardUserRel) { return boardUserRel.user; });
                return [4 /*yield*/, userModel.find({
                        _id: {
                            $in: userIds
                        }
                    })];
            case 2:
                usersLinkedToBoard = _a.sent();
                if (usersLinkedToBoard) {
                    usersMappedWithRole = usersLinkedToBoard
                        .map(function (user) {
                        return {
                            email: user.email,
                            role: boardUserRels_1.find(function (rel) { return rel.user.toString() === user._id.toString(); }).userRole
                        };
                    })
                        .filter(function (userMapped) { return userMapped && userMapped.email !== req.user.email; });
                    res.send(usersMappedWithRole || []);
                }
                return [3 /*break*/, 4];
            case 3:
                e_10 = _a.sent();
                console.log(e_10, " is the error");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var inviteUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, _a, userToInvite, foundUser, userHasAccessToBoard, randomPassword, newUser, newUserSaved, e_11;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 13, , 14]);
                _i = 0, _a = req.body.usersToInviteList;
                _b.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 12];
                userToInvite = _a[_i];
                return [4 /*yield*/, userModel.findOne({
                        email: userToInvite.email
                    })];
            case 2:
                foundUser = _b.sent();
                if (!foundUser) return [3 /*break*/, 7];
                return [4 /*yield*/, checkUserHasAccessToBoard(foundUser._id, req.body.boardId)];
            case 3:
                userHasAccessToBoard = _b.sent();
                if (!userHasAccessToBoard) return [3 /*break*/, 4];
                console.log("user already has access to board");
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, giveAccessToBoard(foundUser._id, req.body.boardId, userToInvite.role)];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [3 /*break*/, 11];
            case 7:
                randomPassword = generateStrongPassword(10);
                newUser = new userModel({
                    email: userToInvite.email,
                    password: randomPassword,
                    type: "user"
                });
                return [4 /*yield*/, newUser.save()["catch"](function (error) {
                        console.log("didnt work because ", error);
                    })];
            case 8:
                newUserSaved = _b.sent();
                return [4 /*yield*/, giveAccessToBoard(newUserSaved._id, req.body.boardId, userToInvite.role)];
            case 9:
                _b.sent();
                return [4 /*yield*/, sendEmailToUser(userToInvite.email, randomPassword)];
            case 10:
                _b.sent();
                _b.label = 11;
            case 11:
                _i++;
                return [3 /*break*/, 1];
            case 12:
                res.send('all good');
                return [3 /*break*/, 14];
            case 13:
                e_11 = _b.sent();
                console.log(e_11, " is the error");
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); };
