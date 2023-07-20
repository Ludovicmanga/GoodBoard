import axios from "axios";
import { websiteUrl } from "./constants";

export const getLoggedUser = async (boardId: string | null) => {
  return await axios({
    url: `${websiteUrl}/api/users/checkIfAuthenticated`,
    withCredentials: true,
    method: "post",
    data: { boardId },
  });
};
