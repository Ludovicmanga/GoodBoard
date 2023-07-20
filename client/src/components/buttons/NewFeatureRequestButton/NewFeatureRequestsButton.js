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
import { Fab } from "@mui/material";
import styles from "./NewFeatureRequestsButton.module.scss";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import FeatureRequestModal from "../../Modals/FeatureRequestModal/FeatureRequestModal";
import { FeatureRequestModalMode } from "../../../helpers/types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setGeneralProperties } from "../../../redux/features/generalPropertiesSlice";
function NewFeatureRequestsButton(_a) {
    var _b = useState(false), newFeatureRequestsModalOpen = _b[0], setNewFeatureRequestsModalOpen = _b[1];
    var dispatch = useAppDispatch();
    var loggedUser = useAppSelector(function (state) { return state.loggedUser; });
    var handleOpenNewFeatureRequestModal = function () {
        if (loggedUser.user) {
            setNewFeatureRequestsModalOpen(true);
        }
        else {
            dispatch(setGeneralProperties({
                cannotMakeActionModalOpen: true
            }));
        }
    };
    var handleCloseModal = function () {
        setNewFeatureRequestsModalOpen(false);
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Fab, __assign({ color: "primary", variant: "extended", className: styles.button, onClick: handleOpenNewFeatureRequestModal }, { children: [_jsx(AddIcon, { className: styles.addIcon }), "New request"] })), _jsx(FeatureRequestModal, { modalMode: FeatureRequestModalMode.creation, modalIsOpen: newFeatureRequestsModalOpen, handleCloseModal: handleCloseModal })] }));
}
export default NewFeatureRequestsButton;
