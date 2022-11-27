"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var material_1 = require("@mui/material");
var react_1 = __importDefault(require("react"));
var NewFeatureRequestsButton_module_scss_1 = __importDefault(require("./NewFeatureRequestsButton.module.scss"));
var Add_1 = __importDefault(require("@mui/icons-material/Add"));
var react_2 = require("react");
var FeatureRequestModal_1 = __importDefault(require("../../Modals/FeatureRequestModal/FeatureRequestModal"));
var types_1 = require("../../../helpers/types");
function NewFeatureRequestsButton(_a) {
    var _b = (0, react_2.useState)(false), newFeatureRequestsModalOpen = _b[0], setNewFeatureRequestsModalOpen = _b[1];
    var handleOpenNewFeatureRequestModal = function () {
        setNewFeatureRequestsModalOpen(true);
    };
    var handleCloseModal = function () {
        setNewFeatureRequestsModalOpen(false);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { onClick: handleOpenNewFeatureRequestModal, className: NewFeatureRequestsButton_module_scss_1["default"].newFeatureRequestButtonContainer },
            react_1["default"].createElement(material_1.Fab, { color: "primary", variant: "extended" },
                react_1["default"].createElement(Add_1["default"], { sx: { mr: 1 } }),
                "New feature request")),
        react_1["default"].createElement(FeatureRequestModal_1["default"], { modalMode: types_1.FeatureRequestModalMode.creation, modalIsOpen: newFeatureRequestsModalOpen, handleCloseModal: handleCloseModal })));
}
exports["default"] = NewFeatureRequestsButton;
