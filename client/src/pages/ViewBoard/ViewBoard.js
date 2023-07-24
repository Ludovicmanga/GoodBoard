import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleSetActiveBoard } from "../../helpers/boards";
import { useAppDispatch } from "../../redux/hooks";
var ViewBoard = function (props) {
    var params = useParams();
    var dispatch = useAppDispatch();
    var navigate = useNavigate();
    useEffect(function () {
        if (params.boardId) {
            handleSetActiveBoard(params.boardId, dispatch, navigate);
        }
    }, [params]);
    return _jsx("div", {});
};
export default ViewBoard;
