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
import ReactDOM from "react-dom/client";
import App from "./App/App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { StyledEngineProvider } from "@mui/material";
var root = ReactDOM.createRoot(document.getElementById("root"));
root.render(_jsx(StyledEngineProvider, __assign({ injectFirst: true }, { children: _jsx(Provider, __assign({ store: store }, { children: _jsx(App, {}) })) })));
