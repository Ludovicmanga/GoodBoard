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
import { Backdrop, Button, Fade, Modal, Paper } from "@mui/material";
import styles from "./CannotMakeActionAsGuestModal.module.scss";
import logInImg from "../../../icons/undraw_Join_re_w1lh.png";
import { useNavigate } from "react-router-dom";
var CannotMakeActionAsGuestModal = function (props) {
    var navigate = useNavigate();
    var handleGoToLoginPage = function () {
        navigate('/login');
        props.handleClose();
    };
    return (_jsx("div", { children: _jsx(Modal, __assign({ "aria-labelledby": "transition-modal-title", "aria-describedby": "transition-modal-description", open: props.modalIsOpen, onClose: props.handleClose, closeAfterTransition: true, BackdropComponent: Backdrop, BackdropProps: {
                timeout: 500
            } }, { children: _jsx(Fade, __assign({ "in": props.modalIsOpen }, { children: _jsxs(Paper, __assign({ className: styles.modalContentContainer }, { children: [_jsx("div", __assign({ className: styles.imgContainer }, { children: _jsx("img", { alt: "cannot do action img", src: logInImg, height: "170px" }) })), _jsxs("div", __assign({ className: styles.infoTextContainer }, { children: [_jsx("div", __assign({ className: styles.infoTextTitle }, { children: "Log In to see more" })), _jsx("p", __assign({ className: styles.infoTextDetails }, { children: "You need to log in to be able to create, vote, or view the details of a feature request" })), _jsx(Button, __assign({ variant: 'outlined', onClick: handleGoToLoginPage }, { children: "Log in" }))] }))] })) })) })) }));
};
export default CannotMakeActionAsGuestModal;
