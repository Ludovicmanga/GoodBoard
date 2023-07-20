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
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import styles from "./SearchBar.module.scss";
var SearchBar = function (_a) {
    var onSearch = _a.onSearch;
    var handleSearch = function (event) {
        var searchTerm = event.target.value;
        onSearch(searchTerm);
    };
    return (_jsx("div", __assign({ className: styles.container }, { children: _jsx("div", __assign({ className: styles.searchBoxContainer }, { children: _jsx(TextField, { placeholder: "Search...", fullWidth: true, variant: "outlined", size: "small", onChange: handleSearch, InputProps: {
                    startAdornment: (_jsx(InputAdornment, __assign({ position: "start" }, { children: _jsx(IconButton, __assign({ disabled: true }, { children: _jsx(Search, {}) })) })))
                } }) })) })));
};
export default SearchBar;
