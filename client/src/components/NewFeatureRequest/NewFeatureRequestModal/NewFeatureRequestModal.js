"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.NewFeatureRequestModal = void 0;
var react_1 = __importDefault(require("react"));
var NewFeatureRequestModal = function (_a) {
    var handleCloseModal = _a.handleCloseModal;
    return (react_1["default"].createElement("div", { className: 'newFeatureRequestModal' },
        react_1["default"].createElement("div", { className: 'newFeatureRequestModal--wrapper' },
            react_1["default"].createElement("div", { className: 'closeModalIconContainer' },
                react_1["default"].createElement("span", { onClick: function () { return handleCloseModal(false); }, className: 'closeModalIcon' }, "\u2715")),
            react_1["default"].createElement("form", { className: 'newFeatureRequestModal--form' },
                react_1["default"].createElement("label", { htmlFor: 'newFeatureRequestModal--titleInput' }, "Titre"),
                react_1["default"].createElement("br", null),
                react_1["default"].createElement("div", { className: 'inputContainer' },
                    react_1["default"].createElement("input", { id: "newFeatureRequestModal--titleInput", placeholder: 'Ex: Changer la couleur de fond du site', type: "text" })),
                react_1["default"].createElement("br", null),
                react_1["default"].createElement("label", { htmlFor: 'newFeatureRequestModal--detailsInput' }, "D\u00E9tails"),
                react_1["default"].createElement("br", null),
                react_1["default"].createElement("div", { className: 'inputContainer' },
                    react_1["default"].createElement("textarea", { id: "newFeatureRequestModal--detailsInput", placeholder: 'Ex: Je voudrais que la page ait un fond anthracite' })),
                react_1["default"].createElement("br", null),
                react_1["default"].createElement("div", { className: 'newFeatureRequestModal--form--btnContainer' },
                    react_1["default"].createElement("input", { type: "submit", value: "Valider" }))))));
};
exports.NewFeatureRequestModal = NewFeatureRequestModal;
