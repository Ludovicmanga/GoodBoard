import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "redux";
import { setGeneralProperties } from "../redux/features/generalPropertiesSlice";
import { websiteUrl } from "./constants";
import axios from "axios";
import { setActiveBoardData } from "../redux/features/activeBoardSlice";

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

export const setBoardImageApiCall = async (selectedFile: File, boardId: string) => {
  const formData = new FormData();
  formData.append("image", selectedFile);
  formData.append("boardId", boardId);

  return await axios({
    url: `${websiteUrl}/api/board/set-board-image`,
    method: "post",
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData
  });
}

export const handleUploadImageToBoard = async (selectedFile: File, dispatch: Dispatch, boardId: string) => {
  const res = await setBoardImageApiCall(
    selectedFile,
    boardId,
  );
  if (res.data.url) {
    dispatch(
      setActiveBoardData({
        picture: res.data.url,
      })
    );
  }
}
