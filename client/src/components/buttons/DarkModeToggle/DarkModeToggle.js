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
import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton } from '@mui/material';
import { useAppDispatch } from '../../../redux/hooks';
import { setGeneralProperties } from '../../../redux/features/generalPropertiesSlice';
function DarkModeToggle() {
    var _a = useState(localStorage.getItem('darkMode') === 'on'), isDarkMode = _a[0], setIsDarkMode = _a[1];
    var dispatch = useAppDispatch();
    var handleToggle = function () {
        setIsDarkMode(!isDarkMode);
        dispatch(setGeneralProperties({
            darkMode: isDarkMode ? true : false
        }));
        localStorage.setItem('darkMode', !isDarkMode ? 'on' : 'off');
    };
    return (_jsx(IconButton, __assign({ onClick: handleToggle }, { children: isDarkMode ? _jsx(Brightness7Icon, {}) : _jsx(Brightness4Icon, {}) })));
}
export default DarkModeToggle;
