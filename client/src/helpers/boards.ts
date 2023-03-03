import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "redux";
import { setGeneralProperties } from "../redux/features/generalPropertiesSlice";

export const handleSetActiveBoard = (boardId: string, dispatch: Dispatch, navigate: NavigateFunction) => {
  localStorage.setItem("board", boardId);
  dispatch(
    setGeneralProperties({
      activeBoard: boardId,
    })
  );
  navigate("/");
  dispatch(
    setGeneralProperties({
      switchBoardModalOpen: false,
    })
  );
};