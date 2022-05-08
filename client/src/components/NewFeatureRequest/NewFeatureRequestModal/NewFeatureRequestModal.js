"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.NewFeatureRequestModal = void 0;
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var react_redux_1 = require("react-redux");
var react_redux_2 = require("react-redux");
var featureRequest_actions_1 = require("../../../actions/featureRequest.actions");
var NewFeatureRequestModal = function (_a) {
    var handleCloseModal = _a.handleCloseModal;
    var dispatch = (0, react_redux_2.useDispatch)();
    var _b = (0, react_2.useState)(''), title = _b[0], setTitle = _b[1];
    var _c = (0, react_2.useState)(''), details = _c[0], setDetails = _c[1];
    var _d = (0, react_2.useState)('unassigned'), status = _d[0], setStatus = _d[1];
    var userData = (0, react_redux_1.useSelector)(function (state) { return state.userReducer; });
    var handleCreateNewFeatureRequest = function (e) {
        e.preventDefault();
        var creatorType = userData.type;
        var creator = userData._id;
        dispatch((0, featureRequest_actions_1.createNewFeatureRequest)(title, details, creatorType, status, creator));
        handleCloseModal(false);
    };
    console.log(status);
    return (react_1["default"].createElement("div", { className: 'newFeatureRequestModal' },
        react_1["default"].createElement("div", { className: 'newFeatureRequestModal--wrapper' },
            react_1["default"].createElement("div", { className: 'closeModalIconContainer' },
                react_1["default"].createElement("span", { onClick: function () { return handleCloseModal(false); }, className: 'closeModalIcon' }, "\u2715")),
            react_1["default"].createElement("form", { className: 'newFeatureRequestModal--form', onSubmit: function (e) { return handleCreateNewFeatureRequest(e); } },
                console.log(userData),
                userData.isAdmin && (react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement("label", null, "Status"),
                    react_1["default"].createElement("br", null),
                    react_1["default"].createElement("div", { className: 'inputContainer' },
                        react_1["default"].createElement("select", { onChange: function (e) { return setStatus(e.target.value); } },
                            react_1["default"].createElement("option", { value: 'unassigned' }, "Unassigned"),
                            react_1["default"].createElement("option", { value: 'planned' }, "Planned"),
                            react_1["default"].createElement("option", { value: 'in-progress' }, "In progress"),
                            react_1["default"].createElement("option", { value: 'done' }, "Done"))))),
                react_1["default"].createElement("label", { htmlFor: 'newFeatureRequestModal--titleInput' }, "Titre"),
                react_1["default"].createElement("br", null),
                react_1["default"].createElement("div", { className: 'inputContainer' },
                    react_1["default"].createElement("input", { id: "newFeatureRequestModal--titleInput", placeholder: 'Ex: Changer la couleur de fond du site', type: "text", onChange: function (e) { return setTitle(e.target.value); }, value: title })),
                react_1["default"].createElement("br", null),
                react_1["default"].createElement("label", { htmlFor: 'newFeatureRequestModal--detailsInput' }, "D\u00E9tails"),
                react_1["default"].createElement("br", null),
                react_1["default"].createElement("div", { className: 'inputContainer' },
                    react_1["default"].createElement("textarea", { id: "newFeatureRequestModal--detailsInput", placeholder: 'Ex: Je voudrais que la page ait un fond anthracite', onChange: function (e) { return setDetails(e.target.value); }, value: details })),
                react_1["default"].createElement("br", null),
                react_1["default"].createElement("div", { className: 'newFeatureRequestModal--form--btnContainer' },
                    react_1["default"].createElement("input", { type: "submit", value: "Valider" }))))));
};
exports.NewFeatureRequestModal = NewFeatureRequestModal;
