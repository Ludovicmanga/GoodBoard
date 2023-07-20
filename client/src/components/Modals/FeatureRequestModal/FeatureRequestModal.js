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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { Autocomplete, Avatar, AvatarGroup, Card, Divider, MenuItem, Paper, Select, TextField, } from "@mui/material";
import styles from "./FeatureRequestModal.module.scss";
import ludoPhoto from "../../../photos/ludoImg.jpg";
import { useState } from "react";
import { FeatureRequestModalMode, FeatureRequestStatus, UserType, } from "../../../helpers/types";
import { useEffect } from "react";
import { capitalizeFirstLetter } from "../../../helpers/utils";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addFeatureRequest, deleteFeatureRequest, updateFeatureRequest, } from "../../../redux/features/allFeatureRequestsSlice";
import { setGeneralProperties } from "../../../redux/features/generalPropertiesSlice";
import { emptyFeatureRequest, websiteUrl } from "../../../helpers/constants";
import { FaSalesforce, FaTrello } from "react-icons/fa";
import { RxNotionLogo } from "react-icons/rx";
import TrelloBoardsListModal from "../TrelloBoardsListModal/TrelloBoardsListModal";
import { getTopicsList } from "../../../helpers/topics";
export default function FeatureRequestModal(props) {
    var _this = this;
    var _a, _b;
    var _c = useState(emptyFeatureRequest), featureRequestProperties = _c[0], setFeatureRequestProperties = _c[1];
    var _d = useState(false), hasUpdateRights = _d[0], setHasUpdateRights = _d[1];
    var _e = useState(false), titleHasError = _e[0], setTitleHasError = _e[1];
    var _f = useState(""), titleErrorHelperText = _f[0], setTitleErrorHelperText = _f[1];
    var _g = useState(false), detailsHasError = _g[0], setDetailsHasError = _g[1];
    var _h = useState(""), detailsErrorHelperText = _h[0], setDetailsErrorHelperText = _h[1];
    var loggedUserState = useAppSelector(function (state) { return state.loggedUser; });
    var dispatch = useAppDispatch();
    var generalPropertiesState = useAppSelector(function (state) { return state.generalProperties; });
    var _j = useState([]), trelloBoardsList = _j[0], setTrelloBoardsList = _j[1];
    var _k = useState(false), trelloBoardsListModalOpen = _k[0], setTrelloBoardsListModalOpen = _k[1];
    var _l = useState([]), topicsList = _l[0], setTopicsList = _l[1];
    useEffect(function () {
        if (props.modalIsOpen && loggedUserState.user) {
            if (props.featureRequestProperties &&
                props.modalMode === FeatureRequestModalMode.update) {
                setFeatureRequestProperties(props.featureRequestProperties);
            }
            else {
                setFeatureRequestProperties(emptyFeatureRequest);
            }
        }
    }, [props.modalIsOpen, props.featureRequestProperties, props.modalMode]);
    var handleSetTopicsList = function () { return __awaiter(_this, void 0, void 0, function () {
        var topicsListResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getTopicsList()];
                case 1:
                    topicsListResponse = _a.sent();
                    setTopicsList(topicsListResponse.data);
                    return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        if (props.modalIsOpen) {
            handleSetTopicsList();
        }
    }, [props.modalIsOpen]);
    useEffect(function () {
        var _a;
        if (props.modalIsOpen &&
            loggedUserState.user &&
            props.modalMode === FeatureRequestModalMode.update) {
            setHasUpdateRights((loggedUserState === null || loggedUserState === void 0 ? void 0 : loggedUserState.user.roleOnThisBoard) === UserType.admin ||
                (loggedUserState === null || loggedUserState === void 0 ? void 0 : loggedUserState.user.roleOnThisBoard) === UserType.member ||
                (featureRequestProperties === null || featureRequestProperties === void 0 ? void 0 : featureRequestProperties.creator) === ((_a = loggedUserState.user) === null || _a === void 0 ? void 0 : _a._id));
        }
    }, [featureRequestProperties.creator]);
    var deleteRequest = function () { return __awaiter(_this, void 0, void 0, function () {
        var deletedFeature;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios({
                        url: "".concat(websiteUrl, "/api/feature-request/delete"),
                        method: "post",
                        data: {
                            featureRequestId: featureRequestProperties._id
                        },
                        withCredentials: true
                    })];
                case 1:
                    deletedFeature = _a.sent();
                    if (deletedFeature.data.deleted) {
                        dispatch(deleteFeatureRequest({
                            featureRequest: featureRequestProperties
                        }));
                    }
                    dispatch(setGeneralProperties({
                        mainSnackBar: {
                            isOpen: true,
                            message: "The feature was successfully deleted"
                        }
                    }));
                    props.handleCloseModal();
                    return [2 /*return*/];
            }
        });
    }); };
    var upsertRequest = function () { return __awaiter(_this, void 0, void 0, function () {
        var createdFeatureRequest, updatedFeatureRequest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(props.modalMode === FeatureRequestModalMode.creation)) return [3 /*break*/, 2];
                    return [4 /*yield*/, axios({
                            url: "".concat(websiteUrl, "/api/feature-request/create"),
                            method: "post",
                            data: {
                                featureRequest: featureRequestProperties,
                                boardId: generalPropertiesState.activeBoard
                            },
                            withCredentials: true
                        })];
                case 1:
                    createdFeatureRequest = _a.sent();
                    if (createdFeatureRequest) {
                        dispatch(addFeatureRequest({
                            featureRequest: createdFeatureRequest.data
                        }));
                        dispatch(setGeneralProperties({
                            mainSnackBar: {
                                isOpen: true,
                                message: "The feature was successfully created"
                            }
                        }));
                    }
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, axios({
                        url: "".concat(websiteUrl, "/api/feature-request/update"),
                        method: "post",
                        data: {
                            featureRequest: featureRequestProperties
                        },
                        withCredentials: true
                    })];
                case 3:
                    updatedFeatureRequest = _a.sent();
                    if (updatedFeatureRequest) {
                        dispatch(updateFeatureRequest({
                            featureRequestToUpdate: updatedFeatureRequest.data
                        }));
                        dispatch(setGeneralProperties({
                            mainSnackBar: {
                                isOpen: true,
                                message: "The feature was successfully updated"
                            }
                        }));
                    }
                    _a.label = 4;
                case 4:
                    props.handleCloseModal();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleUpsertRequest = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(featureRequestProperties.title.length > 0 &&
                        featureRequestProperties.details.length > 0)) return [3 /*break*/, 2];
                    return [4 /*yield*/, upsertRequest()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    if (featureRequestProperties.title.length === 0) {
                        setTitleHasError(true);
                        setTitleErrorHelperText("Title cannot be empty");
                        setTimeout(function () {
                            setTitleHasError(false);
                            setTitleErrorHelperText("");
                        }, 3000);
                    }
                    if (featureRequestProperties.details.length === 0) {
                        setDetailsHasError(true);
                        setDetailsErrorHelperText("Details cannot be empty");
                        setTimeout(function () {
                            setDetailsHasError(false);
                            setDetailsErrorHelperText("");
                        }, 3000);
                    }
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleDisplayTrelloCards = function () { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios({
                        method: "POST",
                        url: "".concat(websiteUrl, "/api/integration/getTrelloBoards"),
                        withCredentials: true
                    })];
                case 1:
                    res = _a.sent();
                    setTrelloBoardsList(res.data);
                    setTrelloBoardsListModalOpen(true);
                    return [2 /*return*/];
            }
        });
    }); };
    return (_jsx(Modal, __assign({ "aria-labelledby": "transition-modal-title", "aria-describedby": "transition-modal-description", open: props.modalIsOpen, onClose: props.handleCloseModal, closeAfterTransition: true, BackdropComponent: Backdrop, BackdropProps: {
            timeout: 500
        } }, { children: _jsx(Fade, __assign({ "in": props.modalIsOpen }, { children: _jsxs(Paper, __assign({ className: styles.modalContentContainer }, { children: [_jsx("div", __assign({ className: styles.modalTitle }, { children: props.modalMode === FeatureRequestModalMode.creation
                            ? "Make feature request"
                            : props.modalMode === FeatureRequestModalMode.update &&
                                hasUpdateRights
                                ? "Update feature request"
                                : "" })), _jsx(Divider, { className: styles.divider }), _jsxs("div", __assign({ className: styles.middle }, { children: [_jsxs("div", __assign({ className: styles.mainContentMiddleContainer }, { children: [props.modalMode === FeatureRequestModalMode.update && (_jsxs("div", { children: [_jsxs("div", __assign({ className: styles.votersSection }, { children: [_jsx("div", __assign({ className: styles.votersSectionTitle }, { children: "Voters :" })), _jsx(AvatarGroup, __assign({ className: styles.avatarGroup, total: (_a = featureRequestProperties.voters) === null || _a === void 0 ? void 0 : _a.length }, { children: featureRequestProperties.voters.length > 0 ? ((_b = featureRequestProperties.voters) === null || _b === void 0 ? void 0 : _b.slice(0, 4).map(function (voter) { return (_jsx(Avatar, { alt: "Voters pic", src: ludoPhoto }, voter)); })) : (_jsx("div", { children: "Not voted yet" })) }))] })), _jsxs("div", __assign({ className: styles.statusSection }, { children: [_jsx("div", __assign({ className: styles.statusSectionTitle }, { children: "Status :" })), _jsx(Select, __assign({ inputProps: {
                                                            readOnly: props.modalMode === FeatureRequestModalMode.update &&
                                                                !hasUpdateRights
                                                        }, labelId: "status", id: "status", value: featureRequestProperties.status, label: "Status", onChange: function (e) {
                                                            setFeatureRequestProperties(function (propertiesState) {
                                                                return __assign(__assign({}, propertiesState), { status: e.target.value });
                                                            });
                                                        } }, { children: Object.keys(FeatureRequestStatus).map(function (status) { return (_jsx(MenuItem, __assign({ value: status }, { children: capitalizeFirstLetter(status) }), status)); }) }))] }))] })), _jsx("div", __assign({ className: styles.statusSection }, { children: _jsx(Autocomplete, { readOnly: props.modalMode === FeatureRequestModalMode.update &&
                                                !hasUpdateRights, multiple: true, onChange: function (e, value) {
                                                setFeatureRequestProperties(function (propertiesState) {
                                                    return __assign(__assign({}, propertiesState), { topics: value });
                                                });
                                            }, value: (featureRequestProperties === null || featureRequestProperties === void 0 ? void 0 : featureRequestProperties.topics) || [], limitTags: 3, options: topicsList, getOptionLabel: function (option) { return option; }, renderInput: function (params) { return (_jsx(TextField, __assign({}, params, { label: "Feature topics", placeholder: "Topics of the feature" }))); }, sx: { width: "500px" } }) })), _jsx(TextField, { InputProps: {
                                            readOnly: props.modalMode === FeatureRequestModalMode.update &&
                                                !hasUpdateRights
                                        }, error: titleHasError, helperText: titleErrorHelperText, label: "Title", value: featureRequestProperties.title, onChange: function (e) {
                                            setFeatureRequestProperties(function (propertiesState) {
                                                return __assign(__assign({}, propertiesState), { title: e.target.value });
                                            });
                                        }, className: "".concat(styles.textInput, " ").concat(styles.titleInput) }), _jsx(TextField, { InputProps: {
                                            readOnly: props.modalMode === FeatureRequestModalMode.update &&
                                                !hasUpdateRights
                                        }, error: detailsHasError, helperText: detailsErrorHelperText, label: "Details", multiline: true, rows: 4, value: featureRequestProperties.details, onChange: function (e) {
                                            setFeatureRequestProperties(function (propertiesState) {
                                                return __assign(__assign({}, propertiesState), { details: e.target.value });
                                            });
                                        }, className: "".concat(styles.textInput, " ").concat(styles.textArea) })] })), _jsxs("div", __assign({ className: styles.rightNavbar }, { children: [_jsx("div", __assign({ className: styles.rightNavbarTitle }, { children: "Integrations" })), _jsxs(Card, __assign({ onClick: handleDisplayTrelloCards, className: styles.integrationChip }, { children: [_jsx(FaTrello, { color: "#007AC0" }), _jsx("div", __assign({ className: styles.integrationChipText }, { children: "Trello" }))] })), _jsxs(Card, __assign({ className: styles.integrationChip }, { children: [_jsx(FaSalesforce, { color: "#009EDB" }), _jsx("div", __assign({ className: styles.integrationChipText }, { children: "Salesforce" }))] })), _jsxs(Card, __assign({ className: styles.integrationChip }, { children: [_jsx(RxNotionLogo, {}), _jsx("div", __assign({ className: styles.integrationChipText }, { children: "Notion" }))] }))] }))] })), _jsxs("div", __assign({ className: styles.mainButtonsContainer }, { children: [(hasUpdateRights ||
                                props.modalMode === FeatureRequestModalMode.creation) && (_jsxs(Button, __assign({ onClick: handleUpsertRequest, className: styles.submitButton, variant: "contained" }, { children: [props.modalMode === FeatureRequestModalMode.creation
                                        ? "Create "
                                        : "Update ", "request"] }))), hasUpdateRights &&
                                props.modalMode === FeatureRequestModalMode.update && (_jsx(Button, __assign({ className: styles.submitButton, onClick: deleteRequest, variant: "outlined", color: "error" }, { children: "Delete request" })))] })), _jsx(TrelloBoardsListModal, { cardTitle: featureRequestProperties.title, cardDescription: featureRequestProperties.details, trelloBoardsList: trelloBoardsList, modalIsOpen: trelloBoardsListModalOpen, handleClose: function () { return setTrelloBoardsListModalOpen(false); } })] })) })) })));
}
