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
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Card, Chip, ToggleButton, useTheme } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import { useState } from "react";
import styles from "./FeatureRequestBox.module.scss";
import { FeatureRequestModalMode } from "../../helpers/types";
import FeatureRequestModal from "../Modals/FeatureRequestModal/FeatureRequestModal";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { downVote, upVote } from "../../redux/features/allFeatureRequestsSlice";
import { useEffect } from "react";
import { addToVotedFeatures, removeFromVotedFeatures, } from "../../redux/features/loggedUserSlice";
import { websiteUrl } from "../../helpers/constants";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
function FeatureRequestBox(props) {
    var _this = this;
    var _a, _b;
    var _c = useState(false), isVoted = _c[0], setIsVoted = _c[1];
    var _d = useState(false), isClickedAtLeastOnce = _d[0], setIsClickedAtLeastOnce = _d[1];
    var _e = useState(false), newFeatureRequestsModalOpen = _e[0], setNewFeatureRequestsModalOpen = _e[1];
    var handleCloseModal = function () {
        setNewFeatureRequestsModalOpen(false);
    };
    var dispatch = useAppDispatch();
    var loggedUser = useAppSelector(function (state) { return state.loggedUser; });
    var menuSelectedState = useAppSelector(function (state) { return state.generalProperties.menuSelected; });
    var handleVote = function () { return __awaiter(_this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "";
                    if (!loggedUser.user) return [3 /*break*/, 2];
                    if (isVoted) {
                        url = "".concat(websiteUrl, "/api/feature-request/up-vote/").concat(props.featureRequestProperties._id);
                        dispatch(upVote({
                            featureRequestId: props.featureRequestProperties._id,
                            userId: loggedUser.user._id
                        }));
                        dispatch(addToVotedFeatures({
                            featureRequestId: props.featureRequestProperties._id
                        }));
                    }
                    else {
                        url = "".concat(websiteUrl, "/api/feature-request/down-vote/").concat(props.featureRequestProperties._id);
                        dispatch(downVote({
                            featureRequestId: props.featureRequestProperties._id,
                            userId: loggedUser.user._id
                        }));
                        dispatch(removeFromVotedFeatures({
                            featureRequestId: props.featureRequestProperties._id
                        }));
                    }
                    return [4 /*yield*/, axios({
                            url: url,
                            method: "post",
                            data: {
                                userId: loggedUser.user._id
                            }
                        })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        if (isClickedAtLeastOnce) {
            handleVote();
        }
    }, [isVoted]);
    useEffect(function () {
        if (loggedUser.user) {
            setIsVoted(loggedUser.user.voted.includes(props.featureRequestProperties._id));
        }
    }, [(_a = loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.user) === null || _a === void 0 ? void 0 : _a.voted, menuSelectedState]);
    var handleMakeClickedAtLeastOnce = function () {
        setIsClickedAtLeastOnce(true);
    };
    var handleChangeToggleBtn = function () {
        if (loggedUser.user) {
            setIsVoted(!isVoted);
        }
        else {
            dispatch(setGeneralProperties({
                cannotMakeActionModalOpen: true
            }));
        }
    };
    var handleOpenNewFeatureRequestsModal = function () {
        if (loggedUser.user) {
            setNewFeatureRequestsModalOpen(true);
        }
        else {
            dispatch(setGeneralProperties({
                cannotMakeActionModalOpen: true
            }));
        }
    };
    var theme = useTheme();
    return (_jsxs("div", __assign({ className: styles.container }, { children: [_jsxs("div", __assign({ className: styles.newFeatureRequestsBox }, { children: [_jsxs(Card, __assign({ className: styles.contentBox, onClick: handleOpenNewFeatureRequestsModal }, { children: [_jsxs("h3", __assign({ className: styles.featureRequestTitle }, { children: [props.featureRequestProperties.title.slice(0, 30), props.featureRequestProperties.title.length > 30 && "..."] })), _jsxs("div", __assign({ className: styles.featureRequestDescription }, { children: [props.featureRequestProperties.details.slice(0, 50), props.featureRequestProperties.details.length > 50 && "..."] })), _jsx("div", __assign({ className: styles.tagsContainer }, { children: props.featureRequestProperties.topics.map(function (category) { return (_jsx(Chip, { className: styles.tag, label: category }, category)); }) }))] })), _jsx(ToggleButton, __assign({ value: "check", selected: isVoted, onChange: handleChangeToggleBtn, onClick: handleMakeClickedAtLeastOnce, className: styles.checkButton, sx: {
                            "&.Mui-selected": {
                                bgcolor: theme.palette.primary.main
                            },
                            '&:hover': theme.palette.primary.main,
                            color: theme.palette.text.primary
                        } }, { children: _jsxs("div", __assign({ className: styles.votesBox }, { children: [isVoted ? (_jsx("div", __assign({ className: styles.iconContainer }, { children: _jsx(CheckRoundedIcon, { sx: { fontSize: 15 } }) }))) : (_jsx("div", __assign({ className: styles.iconContainer }, { children: _jsx(ArrowDropUpRoundedIcon, {}) }))), _jsx("div", __assign({ className: styles.voteCountContainer }, { children: ((_b = props.featureRequestProperties.voters) === null || _b === void 0 ? void 0 : _b.length) || 0 }))] })) }))] })), _jsx(FeatureRequestModal, { modalMode: FeatureRequestModalMode.update, modalIsOpen: newFeatureRequestsModalOpen, handleCloseModal: handleCloseModal, featureRequestProperties: props.featureRequestProperties })] })));
}
export default FeatureRequestBox;
