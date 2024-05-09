import axios from "axios";
import { websiteUrl } from "./constants";
import { TopicType } from "./types";

export const getTopicsList = async (boardId: string) => {
  const topicsListResponse = await axios<TopicType[]>({
    url: `${websiteUrl}/api/topic/get-all`,
    method: "POST",
    data: {
      boardId,
    },
    withCredentials: true,
  });
  if (topicsListResponse) {
    return topicsListResponse.data;
  }
}