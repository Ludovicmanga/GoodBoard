import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "redux";
import { setGeneralProperties } from "../redux/features/generalPropertiesSlice";
import { websiteUrl } from "./constants";
import axios from "axios";

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

export const getBoardShareableUrl = async (boardId: string) => {
  const urlResponse = await axios<{ url: string }>({
    url: `${websiteUrl}/api/board/get-share-url`,
    method: "post",
    data: {
      boardId,
    },
  });
  if (urlResponse.data.url) {
    return urlResponse.data.url;
  }
};