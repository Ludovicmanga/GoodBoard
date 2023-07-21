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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Card, CardContent, Divider } from "@mui/material";
import { useState } from "react";
import styles from "./RoadMapFeature.module.scss";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { FeatureRequestModalMode, UserType, } from "../../helpers/types";
import FeatureRequestModal from "../Modals/FeatureRequestModal/FeatureRequestModal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
var RoadMapFeature = function (props) {
    var _a = useState(false), extendedFeatureRequestsModalOpen = _a[0], setExtendedFeatureRequestsModalOpen = _a[1];
    var dispatch = useAppDispatch();
    var loggedUser = useAppSelector(function (state) { return state.loggedUser; });
    var handleOpenFeatureRequestModal = function () {
        if (loggedUser.user) {
            setExtendedFeatureRequestsModalOpen(true);
        }
        else {
            dispatch(setGeneralProperties({
                cannotMakeActionModalOpen: true
            }));
        }
    };
    var handleCloseModal = function () {
        setExtendedFeatureRequestsModalOpen(false);
    };
    return (_jsxs(_Fragment, { children: [_jsx(Card, __assign({ className: styles.container, onClick: handleOpenFeatureRequestModal }, { children: _jsxs(CardContent, __assign({ className: styles.cardContent }, { children: [_jsx("div", __assign({ className: styles.topContentRow }, { children: _jsxs("div", __assign({ className: styles.topContent }, { children: [_jsx("div", __assign({ className: styles.dotIconContainer }, { children: _jsx(FiberManualRecordIcon, { className: styles.dotIcon, sx: {
                                                fontSize: 8,
                                                color: "#4263EB"
                                            } }) })), _jsx("div", __assign({ className: styles.featureType }, { children: props.featureRequest.creatorType === UserType.admin
                                            ? "Our ideas"
                                            : "Your ideas" }))] })) })), _jsxs("div", __assign({ className: styles.title }, { children: [props.featureRequest.title.slice(0, 25), props.featureRequest.title.length > 25 && "..."] })), _jsxs("div", __assign({ className: styles.detailsContainer }, { children: [props.featureRequest.details.slice(0, 60), props.featureRequest.details.length > 60 && "..."] })), _jsx("div", __assign({ className: styles.dividerContainer }, { children: _jsx("div", __assign({ className: styles.divider }, { children: _jsx(Divider, {}) })) })), _jsxs("div", __assign({ className: styles.bottomContent }, { children: [_jsx("div", __assign({ className: styles.arrowIconContainer }, { children: _jsx(ArrowDropUpIcon, { className: styles.icon, sx: {
                                            fontSize: 25,
                                            color: "#4C6EF5"
                                        } }) })), _jsx("div", __assign({ className: styles.votesCount }, { children: props.featureRequest.voters.length }))] }))] })) })), _jsx(FeatureRequestModal, { modalMode: FeatureRequestModalMode.update, modalIsOpen: extendedFeatureRequestsModalOpen, handleCloseModal: handleCloseModal, featureRequestProperties: props.featureRequest })] }));
};
export default RoadMapFeature;
