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
import { Box, Card, Paper, useTheme } from "@mui/material";
import { useEffect } from "react";
import EmptyData from "../../components/EmptyData/EmptyData";
import MainHero from "../../components/MainHero/MainHero";
import MainNavBar from "../../components/MainNavBar/MainNavBar";
import RoadMapFeature from "../../components/RoadMapFeature/RoadMapFeature";
import { EmptyPageType, FeatureRequestStatus, MenuSelected, } from "../../helpers/types";
import { capitalizeFirstLetter } from "../../helpers/utils";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import styles from "./Roadmap.module.scss";
function Roadmap(_a) {
    var allFeatureRequests = useAppSelector(function (state) { return state.allFeatureRequests; });
    var dispatch = useAppDispatch();
    var theme = useTheme();
    useEffect(function () {
        dispatch(setGeneralProperties({
            menuSelected: MenuSelected.roadmap
        }));
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(MainNavBar, {}), _jsx(MainHero, {}), _jsx("div", __assign({ className: styles.container }, { children: _jsx(Box, __assign({ className: styles.box }, { children: _jsx(_Fragment, { children: Object.keys(FeatureRequestStatus).map(function (status) {
                            var featureRequestsWithCorrespondingStatus = allFeatureRequests.filter(function (featureRequest) { return featureRequest.status === status; });
                            return (_jsxs(Paper, __assign({ elevation: 3, className: styles.paperContainer }, { children: [_jsxs(Card, __assign({ className: styles.title, sx: {
                                            backgroundColor: status === "done" ? theme.palette.primary.dark : ""
                                        } }, { children: [_jsx("div", __assign({ className: styles.statusTitle }, { children: capitalizeFirstLetter(status) })), _jsx("div", __assign({ className: styles.featureNumberContainer }, { children: featureRequestsWithCorrespondingStatus.length }))] })), _jsx("div", __assign({ className: styles.featureContainer }, { children: featureRequestsWithCorrespondingStatus.length > 0 ? (featureRequestsWithCorrespondingStatus.map(function (featureRequestWithCorrespondingStatus) { return (_jsx(RoadMapFeature, { featureRequest: featureRequestWithCorrespondingStatus })); })) : (_jsx("div", __assign({ className: styles.emptyDataContainer }, { children: _jsx(EmptyData, { text: "Nothing planned yet", type: EmptyPageType.roadmap }) }))) }))] })));
                        }) }) })) }))] }));
}
export default Roadmap;
