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
import { Backdrop, Fade, Modal, Paper } from "@mui/material";
import ChooseBoardColor from "../../ChooseBoardColor/ChooseBoardColor";
import styles from "./ChangeBoardColorModal.module.scss";
var ChangeBoardColorModal = function (props) {
    return (_jsx("div", { children: _jsx(Modal, __assign({ "aria-labelledby": "transition-modal-title", "aria-describedby": "transition-modal-description", open: props.modalIsOpen, onClose: props.handleClose, closeAfterTransition: true, BackdropComponent: Backdrop, BackdropProps: {
                timeout: 500
            } }, { children: _jsx(Fade, __assign({ "in": props.modalIsOpen }, { children: _jsx(Paper, __assign({ className: styles.modalContentContainer }, { children: _jsx(ChooseBoardColor, { mode: "update" }) })) })) })) }));
};
export default ChangeBoardColorModal;
