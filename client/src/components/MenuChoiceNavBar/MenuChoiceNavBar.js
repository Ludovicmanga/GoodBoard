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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './MenuChoiceNavBar.module.scss';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { MenuSelected } from '../../helpers/types';
import { setGeneralProperties } from '../../redux/features/generalPropertiesSlice';
var MenuChoiceNavBar = function (props) {
    var dispatch = useAppDispatch();
    var generalPropertiesState = useAppSelector(function (state) { return state.generalProperties; });
    return (_jsxs("div", __assign({ className: styles.container }, { children: [_jsx("div", __assign({ className: styles.buttonContainer }, { children: _jsx(NavLink, __assign({ to: '/user-feature-requests' }, { children: _jsx(Button, __assign({ onClick: function () { return dispatch(setGeneralProperties({
                            menuSelected: MenuSelected.yourIdeas
                        })); }, className: styles.button, variant: "contained", sx: generalPropertiesState.menuSelected === MenuSelected.yourIdeas ? { backgroundColor: '#0C0454' } : {} }, { children: _jsx("div", __assign({ className: styles.btnText }, { children: "Your ideas" })) })) })) })), _jsx("div", __assign({ className: styles.buttonContainer }, { children: _jsx(NavLink, __assign({ to: '/company-feature-requests' }, { children: _jsx(Button, __assign({ onClick: function () { return dispatch(setGeneralProperties({
                            menuSelected: MenuSelected.ourIdeas
                        })); }, className: styles.button, variant: "contained", sx: generalPropertiesState.menuSelected === MenuSelected.ourIdeas ? { backgroundColor: '#0C0454' } : {} }, { children: _jsx("div", __assign({ className: styles.btnText }, { children: "Our ideas" })) })) })) })), _jsx("div", __assign({ className: styles.buttonContainer }, { children: _jsx(NavLink, __assign({ to: '/roadmap' }, { children: _jsx(Button, __assign({ onClick: function () { return dispatch(setGeneralProperties({
                            menuSelected: MenuSelected.roadmap
                        })); }, className: styles.button, variant: "contained", sx: generalPropertiesState.menuSelected === MenuSelected.roadmap ? { backgroundColor: '#0C0454' } : {} }, { children: _jsx("div", __assign({ className: styles.btnText }, { children: "Roadmap" })) })) })) }))] })));
};
export default MenuChoiceNavBar;
