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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Route, Navigate, Routes, } from "react-router-dom";
import FeatureRequests from "../pages/FeatureRequests/FeatureRequests";
import styles from "./index.module.scss";
import Roadmap from "../pages/Roadmap/Roadmap";
import { AuthPageType, UserType } from "../helpers/types";
import Login from "../components/Login/Login";
import { useAppSelector } from "../redux/hooks";
import BoardCreation from "../pages/BoardCreation/BoardCreation";
import Integrations from "../pages/Integrations/Integrations";
import ViewBoard from "../pages/ViewBoard/ViewBoard";
export default function Index() {
    var loggedUser = useAppSelector(function (state) { return state.loggedUser; });
    var generalPropertiesState = useAppSelector(function (state) { return state.generalProperties; });
    var activeBoard = generalPropertiesState.activeBoard;
    return (_jsx("div", __assign({ className: styles.container }, { children: _jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/sign-up", element: _jsx(Login, { authType: AuthPageType.signUp }) }), _jsx(Route, { path: "/login", element: _jsx(Login, { authType: AuthPageType.login }) }), _jsx(Route, { path: "/choose-board", element: _jsx(BoardCreation, {}) }), _jsx(Route, { path: "/view-board/:boardId", element: _jsx(ViewBoard, {}) }), loggedUser.user && !activeBoard && (_jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/choose-board", replace: true }) })), loggedUser.user && activeBoard && (_jsxs(_Fragment, { children: [_jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/user-feature-requests", replace: true }) }), _jsx(Route, { path: "/integrations", element: _jsx(Integrations, {}) })] })), _jsxs(_Fragment, { children: [_jsx(Route, { path: "/company-feature-requests", element: _jsx(FeatureRequests, { type: UserType.admin }) }), _jsx(Route, { path: "/user-feature-requests", element: _jsx(FeatureRequests, { type: UserType.user }) }), _jsx(Route, { path: "/roadmap", element: _jsx(Roadmap, {}) })] })] }) }) })));
}
