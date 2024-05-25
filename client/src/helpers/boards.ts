import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "redux";
import { setGeneralProperties } from "../redux/features/generalPropertiesSlice";
import { websiteUrl } from "./constants";
import axios from "axios";
import { setActiveBoardData } from "../redux/features/activeBoardSlice";
import { Board } from "./types";

export const handleSetActiveBoard = async (
  boardId: string,
  dispatch: Dispatch,
  navigate: NavigateFunction
) => {
  localStorage.setItem("board", boardId);
  const hasAccessResponse = await checkUserAccessAPICall(boardId);
  if (hasAccessResponse.data.hasAccessToActiveBoard) {
    dispatch(
      setGeneralProperties({
        activeBoard: boardId,
      })
    );
    navigate("/");
  } else {
    navigate("/login");
  }

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

export const deleteBoardImageApiCall = async (boardId: string) => {
  return await axios({
    url: `${websiteUrl}/api/board/delete-board-image`,
    method: "put",
    data: {
      boardId
    },
    withCredentials: true,
  });
}

export const updateBoardImageApiCall = async (
  selectedFile: File,
  boardId: string
) => {
  const formData = new FormData();
  formData.append("image", selectedFile);
  formData.append("boardId", boardId);

  return await axios({
    url: `${websiteUrl}/api/board/update-board-image`,
    method: "post",
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
};

export const handleUploadImageToBoard = async (
  selectedFile: File,
  dispatch: Dispatch,
  boardId: string
) => {
  const res = await updateBoardImageApiCall(selectedFile, boardId);
  if (res.data.url) {
    dispatch(
      setActiveBoardData({
        picture: res.data.url,
      })
    );
  }
};

export const checkUserAccessAPICall = async (boardId: string) => {
  return await axios<{
    hasAccessToActiveBoard: boolean,
    boardsUserHasAccessList: Board[],
  }>({
    method: "post",
    withCredentials: true,
    url: `${websiteUrl}/api/board/check-user-has-access-to-board`,
    data: {
      boardId,
    },
  });
};

export const updateTwitterUrlApiCall = async (
  newUrl: string,
  boardId: string
) => {
  return await axios({
    url: `${websiteUrl}/api/board/update-twitter-url`,
    method: "post",
    withCredentials: true,
    data: {
      twitterUrl: newUrl,
      boardId
    },
  });
};

export const updateInstagramUrlApiCall  = async (
  newUrl: string,
  boardId: string
) => {
  const response = await axios<Board>({
    url: `${websiteUrl}/api/board/update-instagram-url`,
    method: "post",
    withCredentials: true,
    data: {
      instagramUrl: newUrl,
      boardId
    },
  });
  if (response.data) {
    return response.data;
  }
};

export const updateFacebookUrlApiCall = async (
  newUrl: string,
  boardId: string
) => {
  return await axios({
    url: `${websiteUrl}/api/board/update-facebook-url`,
    method: "post",
    withCredentials: true,
    data: {
      facebookUrl: newUrl,
      boardId
    },
  });
};