import axios from "axios";
import { websiteUrl } from "./constants";
import { User } from "./types";

export const getLoggedUser = async (boardId: string | null | undefined) => {
  return await axios({
    url: `${websiteUrl}/api/users/checkIfAuthenticated`,
    withCredentials: true,
    method: "post",
    data: { boardId },
  });
};

export const updateUserProfilePictureApiCall = async (selectedFile: File) => {
  const formData = new FormData();
  formData.append("image", selectedFile);
  const response = await axios<User>({
    url: `${websiteUrl}/api/users/update-picture`,
    method: "post",
    withCredentials: true,
    data: formData,
  });
  return response;
};
