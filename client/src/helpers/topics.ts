import axios from "axios";
import { websiteUrl } from "./constants";

export const getTopicsList = async () => {
  return await axios<string[]>({
    url: `${websiteUrl}/api/topics/get-all`,
    method: "get",
    withCredentials: true,
  });
}