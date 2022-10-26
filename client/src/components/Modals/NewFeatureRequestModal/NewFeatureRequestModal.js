"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var React = __importStar(require("react"));
var Backdrop_1 = __importDefault(require("@mui/material/Backdrop"));
var Modal_1 = __importDefault(require("@mui/material/Modal"));
var Fade_1 = __importDefault(require("@mui/material/Fade"));
var Button_1 = __importDefault(require("@mui/material/Button"));
var material_1 = require("@mui/material");
var NewFeatureRequestModal_module_scss_1 = __importDefault(require("./NewFeatureRequestModal.module.scss"));
var ludoImg_jpg_1 = __importDefault(require("../../../photos/ludoImg.jpg"));
var react_1 = require("react");
function TransitionsModal(props) {
    var _a = (0, react_1.useState)(''), status = _a[0], setStatus = _a[1];
    var handleChangeStatus = function (e) {
        setStatus(e.target.value);
    };
    return (React.createElement("div", null,
        React.createElement(Modal_1["default"], { "aria-labelledby": "transition-modal-title", "aria-describedby": "transition-modal-description", open: props.modalIsOpen, onClose: props.handleCloseModal, closeAfterTransition: true, BackdropComponent: Backdrop_1["default"], BackdropProps: {
                timeout: 500
            } },
            React.createElement(Fade_1["default"], { "in": props.modalIsOpen },
                React.createElement("div", { className: NewFeatureRequestModal_module_scss_1["default"].modalContentContainer },
                    React.createElement("div", { className: NewFeatureRequestModal_module_scss_1["default"].votersSection },
                        React.createElement("div", null, "Voters:"),
                        React.createElement(material_1.AvatarGroup, { total: 9 },
                            React.createElement(material_1.Avatar, { alt: "Voters pic", src: ludoImg_jpg_1["default"] }),
                            React.createElement(material_1.Avatar, { alt: "Vote pic", src: ludoImg_jpg_1["default"] }))),
                    React.createElement("div", null,
                        "Status:",
                        React.createElement(material_1.Select, { labelId: "status", id: "status", value: status, label: "Status", onChange: handleChangeStatus },
                            React.createElement(material_1.MenuItem, { value: 'assigned' }, "Assigned"),
                            React.createElement(material_1.MenuItem, { value: 'unassigned' }, "Unassigned"),
                            React.createElement(material_1.MenuItem, { value: 'done' }, "Done"))),
                    React.createElement(material_1.TextField, { label: "Titre", variant: "filled" }),
                    React.createElement(material_1.TextField, { label: "Description", variant: "filled" }),
                    React.createElement("div", { className: NewFeatureRequestModal_module_scss_1["default"].submitButtonContainer },
                        React.createElement(Button_1["default"], { variant: "contained" }, "Add request")))))));
}
exports["default"] = TransitionsModal;
