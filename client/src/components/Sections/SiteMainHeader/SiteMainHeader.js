import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import MainHero from "../../MainHero/MainHero";
import MainNavBar from "../../MainNavBar/MainNavBar";
import MenuChoiceNavBar from "../../MenuChoiceNavBar/MenuChoiceNavBar";
var SiteMainHeader = function (props) {
    var generalPropertiesState = useAppSelector(function (state) { return state.generalProperties; });
    var dispatch = useAppDispatch();
    return (_jsxs(_Fragment, { children: [_jsx(MainNavBar, {}), _jsx(MainHero, {}), _jsx(MenuChoiceNavBar, {})] }));
};
export default SiteMainHeader;
