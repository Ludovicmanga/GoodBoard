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
import { useEffect, useState } from "react";
import IntegrationBox from "../../components/IntegrationBox/IntegrationBox";
import MainNavBar from "../../components/MainNavBar/MainNavBar";
import styles from "./Integrations.module.scss";
import axios from "axios";
import { websiteUrl } from "../../helpers/constants";
var integrations = [
    {
        name: "Trello",
        description: "Push suggestions to your Trello boards",
        connected: false,
        logo: "https://goodboard.s3.eu-central-1.amazonaws.com/58482beecef1014c0b5e4a36.png"
    },
    {
        name: "Jira software",
        description: "Push suggestions to your Jira boards",
        connected: false,
        logo: "https://goodboard.s3.eu-central-1.amazonaws.com/5968875.png"
    },
    {
        name: "Slack",
        description: "Get notified when your features ar upvoted",
        connected: false,
        logo: "https://goodboard.s3.eu-central-1.amazonaws.com/5cb480cd5f1b6d3fbadece79.png"
    },
    {
        name: "Salesforce",
        description: "Push suggestions to your Salesforce",
        connected: false,
        logo: "https://goodboard.s3.eu-central-1.amazonaws.com/logo-salesforce.png"
    },
    {
        name: "Notion",
        description: "Push suggestions to your Notion boards",
        connected: false,
        logo: "https://goodboard.s3.eu-central-1.amazonaws.com/Notion_app_logo.png"
    },
    {
        name: "Google Drive",
        description: "Push suggestions to your Google Drive",
        connected: false,
        logo: "https://goodboard.s3.eu-central-1.amazonaws.com/Google_Drive_logo.png"
    },
];
var handleClickIntegration = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios({
                    url: "".concat(websiteUrl, "/api/integration/loginTrello"),
                    method: "post",
                    withCredentials: true
                })];
            case 1:
                res = _a.sent();
                console.log(res, " is the res");
                if (res.data) {
                    window.open(res.data);
                }
                return [2 /*return*/];
        }
    });
}); };
var Integrations = function (props) {
    var _a = useState(integrations), integrationsList = _a[0], setIntegrationsList = _a[1];
    var checkAccessToTrello = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios({
                        url: "".concat(websiteUrl, "/api/integration/check-trello-auth"),
                        method: 'POST',
                        withCredentials: true
                    })];
                case 1:
                    response = _a.sent();
                    if (response.data === true) {
                        setIntegrationsList(function (currArray) { return currArray.map(function (a) {
                            if (a.name === 'Trello') {
                                a.connected = true;
                            }
                            ;
                            return a;
                        }); });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        if (integrationsList.length > 0) {
            checkAccessToTrello();
        }
    }, [integrationsList]);
    return (_jsxs("div", __assign({ className: styles.container }, { children: [_jsx(MainNavBar, {}), _jsx("div", __assign({ className: styles.integrationsContainer }, { children: integrationsList.map(function (integration) { return (_jsx("div", __assign({ className: styles.integrationBoxContainer, onClick: handleClickIntegration }, { children: _jsx(IntegrationBox, { name: integration.name, description: integration.description, logo: integration.logo, connected: integration.connected }) }))); }) }))] })));
};
export default Integrations;
