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
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import styles from './SwitchBoardModal.module.scss';
import { Paper } from "@mui/material";
import BoardCreation from "../../../../pages/BoardCreation/BoardCreation";
var SwitchBoardModal = function (props) {
    return (_jsx("div", { children: _jsx(Modal, __assign({ "aria-labelledby": "transition-modal-title", "aria-describedby": "transition-modal-description", open: props.modalIsOpen, onClose: props.handleClose, closeAfterTransition: true, BackdropComponent: Backdrop, BackdropProps: {
                timeout: 500
            } }, { children: _jsx(Fade, __assign({ "in": props.modalIsOpen }, { children: _jsx(Paper, __assign({ className: styles.modalContentContainer }, { children: _jsx(BoardCreation, {}) })) })) })) }));
};
export default SwitchBoardModal;
