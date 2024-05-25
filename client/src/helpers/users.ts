import axios from "axios";
import { websiteUrl } from "./constants";
import { User } from "./types";
import { Dispatch } from "redux";
import { setLoggedUserState } from "../redux/features/loggedUserSlice";

export const getLoggedUser = async (boardId: string | null | undefined) => {
  return await axios({
    url: `${websiteUrl}/api/users/checkIfAuthenticated`,
    withCredentials: true,
    method: "post",
    data: { boardId },
  });
};

export const updateUserProfilePictureApiCall = async (selectedFile: File, dispatch: Dispatch) => {
  const formData = new FormData();
  formData.append("image", selectedFile);

  const res =  await axios<User>({
    url: `${websiteUrl}/api/users/update-picture`,
    method: "post",
    withCredentials: true,
    data: formData,
  });
  if (res.data) {
    dispatch(
      setLoggedUserState({
        user: res.data,
      })
    );
  }
};

export const deleteUserProfilePictureApiCall = async () => {
  return await axios<User>({
    url: `${websiteUrl}/api/users/delete-picture`,
    method: "put",
    withCredentials: true,
  });
};
