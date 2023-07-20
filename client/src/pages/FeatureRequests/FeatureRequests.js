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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import NewFeatureRequestsButton from "../../components/buttons/NewFeatureRequestButton/NewFeatureRequestsButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import FeatureRequestBox from "../../components/FeatureRequestBox/FeatureRequestBox";
import { EmptyPageType, MenuSelected, UserType } from "../../helpers/types";
import { useEffect, useState } from "react";
import EmptyData from "../../components/EmptyData/EmptyData";
import styles from "./FeatureRequests.module.scss";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, } from "@mui/material";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import MainNavBar from "../../components/MainNavBar/MainNavBar";
import MainHero from "../../components/MainHero/MainHero";
import TagIcon from "@mui/icons-material/Tag";
import { TiDelete } from "react-icons/ti";
import { getTopicsList } from "../../helpers/topics";
import SearchBar from "../../components/SearchBar/SearchBar";
var FeatureRequests = function (props) {
    var _a = useState(true), statusListOpen = _a[0], setStatusListOpen = _a[1];
    var _b = useState(true), topicsListOpen = _b[0], setTopicsListOpen = _b[1];
    var _c = useState(null), selectedStatus = _c[0], setSelectedStatus = _c[1];
    var _d = useState(null), selectedTopic = _d[0], setSelectedTopic = _d[1];
    var _e = useState([]), topicsList = _e[0], setTopicsList = _e[1];
    var _f = useState(null), searchedWord = _f[0], setSearchedWord = _f[1];
    var _g = useState([]), filteredFeatureRequests = _g[0], setFilteredFeatureRequests = _g[1];
    var allFeatureRequests = useAppSelector(function (state) { return state.allFeatureRequests; });
    var dispatch = useAppDispatch();
    var menuSelectedState = useAppSelector(function (state) { return state.generalProperties.menuSelected; });
    var handleSetTopicsList = function () { return __awaiter(void 0, void 0, void 0, function () {
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
    var handleSetCorrespondingFeatures = function () {
        if (props.type === UserType.externalUser) {
            var featureRequestsWithCorrespondingPropsType = allFeatureRequests.filter(function (featureRequest) { return featureRequest.creatorType === UserType.externalUser; });
            setFilteredFeatureRequests(featureRequestsWithCorrespondingPropsType);
        }
        else {
            var featureRequestsWithCorrespondingPropsType = allFeatureRequests.filter(function (featureRequest) { return featureRequest.creatorType !== UserType.externalUser; });
            setFilteredFeatureRequests(featureRequestsWithCorrespondingPropsType);
        }
    };
    useEffect(function () {
        handleSetTopicsList();
    }, []);
    useEffect(function () {
        if (props.type === UserType.externalUser) {
            dispatch(setGeneralProperties({
                menuSelected: MenuSelected.yourIdeas
            }));
        }
        else {
            dispatch(setGeneralProperties({
                menuSelected: MenuSelected.ourIdeas
            }));
        }
    }, [menuSelectedState]);
    useEffect(function () {
        if (allFeatureRequests.length > 0) {
            handleSetCorrespondingFeatures();
        }
    }, [allFeatureRequests, props.type]);
    var statusChoices = [
        {
            label: "Unassigned",
            btnColor: "#EB765D"
        },
        {
            label: "Assigned",
            btnColor: "#63C8D9"
        },
        {
            label: "Done",
            btnColor: "#1ab856"
        },
    ];
    var handleChangeSelectedTopic = function (featureCategoryChoice) {
        if (selectedTopic === featureCategoryChoice) {
            setSelectedTopic(null);
        }
        else {
            setSelectedTopic(featureCategoryChoice);
        }
    };
    var handleChangeSelectedStatus = function (statusClicked) {
        if (selectedStatus === statusClicked.label) {
            setSelectedStatus(null);
        }
        else {
            setSelectedStatus(statusClicked.label);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(MainNavBar, {}), _jsx(MainHero, {}), _jsxs("div", __assign({ className: styles.sectionContainer }, { children: [_jsx("div", __assign({ className: styles.sidebarContainer }, { children: _jsxs(List, { children: [_jsx(ListItemButton, __assign({ onClick: function () { return setStatusListOpen(!statusListOpen); } }, { children: _jsx(ListItemText, { children: _jsx("div", __assign({ className: styles.listItemButton }, { children: "Status" })) }) })), _jsx(Collapse, __assign({ "in": statusListOpen, timeout: "auto", unmountOnExit: true }, { children: _jsx(List, __assign({ component: "div", disablePadding: true }, { children: statusChoices.map(function (statusChoice) { return (_jsxs(ListItemButton, __assign({ sx: { pl: 4 }, onClick: function () { return handleChangeSelectedStatus(statusChoice); } }, { children: [_jsx(ListItemIcon, { children: _jsx(PanoramaFishEyeIcon, { sx: {
                                                            color: statusChoice.btnColor,
                                                            fontSize: 15
                                                        } }) }), _jsx(ListItemText, { children: _jsx("div", __assign({ className: styles.listItem }, { children: statusChoice.label })) }), selectedStatus === statusChoice.label && (_jsx(TiDelete, { size: 22, color: "grey", onClick: function () { return console.log("i was clicked"); } }))] }), statusChoice.label)); }) })) })), _jsx(ListItemButton, __assign({ onClick: function () { return setTopicsListOpen(!topicsListOpen); } }, { children: _jsx(ListItemText, { children: _jsx("div", __assign({ className: styles.listItemButton }, { children: "Topics" })) }) })), _jsx(Collapse, __assign({ "in": topicsListOpen, timeout: "auto", unmountOnExit: true }, { children: _jsx(List, __assign({ component: "div", disablePadding: true }, { children: topicsList.map(function (topicChoice) { return (_jsxs(ListItemButton, __assign({ sx: { pl: 4 }, onClick: function () { return handleChangeSelectedTopic(topicChoice); } }, { children: [_jsx(ListItemIcon, { children: _jsx(TagIcon, { fontSize: "small" }) }), _jsx(ListItemText, { children: _jsx("div", __assign({ className: styles.listItem }, { children: topicChoice })) }), selectedTopic === topicChoice && (_jsx(TiDelete, { size: 22, color: "grey" }))] }), topicChoice)); }) })) }))] }) })), _jsx("div", __assign({ className: styles.featuresSectionContainer }, { children: filteredFeatureRequests.length > 0 ? (_jsxs("div", __assign({ className: styles.featuresContainer }, { children: [_jsx(SearchBar, { onSearch: function (searchedWord) { return setSearchedWord(searchedWord); } }), filteredFeatureRequests
                                    .filter(function (featReq) {
                                    if (selectedTopic) {
                                        return featReq.topics.includes(selectedTopic);
                                    }
                                    else {
                                        return featReq;
                                    }
                                })
                                    .filter(function (featReq) {
                                    if (selectedStatus) {
                                        return (featReq.status.toLowerCase() ===
                                            selectedStatus.toLowerCase());
                                    }
                                    else {
                                        return featReq;
                                    }
                                })
                                    .filter(function (featReq) {
                                    if (searchedWord) {
                                        return featReq.title.toLowerCase().includes(searchedWord.toLowerCase());
                                    }
                                    else {
                                        return featReq;
                                    }
                                })
                                    .map(function (featureRequest) {
                                    return (_jsx(FeatureRequestBox, { featureRequestProperties: featureRequest }, featureRequest._id));
                                })] }))) : (_jsx("div", __assign({ className: styles.emptyDataContainer }, { children: _jsx(EmptyData, { text: "No feature request yet", type: EmptyPageType.featureRequests }) }))) }))] })), _jsx(NewFeatureRequestsButton, {})] }));
};
export default FeatureRequests;
