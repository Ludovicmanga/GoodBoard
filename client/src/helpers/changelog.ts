import axios from "axios"
import { ChangeLog } from "./types";
import { websiteUrl } from "./constants";

export const updateChangelogVoteApiCall = async ( changelogId: string, voteDirection: 'up' | 'down', emojiVoted: 'happy' | 'middle' | 'sad', boardId: string) => {
    try { 
        const response = await axios<ChangeLog>({
            url: `${websiteUrl}/api/changelog/update-vote`,
            method: "post",
            withCredentials: true,
            data: { changelogId, voteDirection, emojiVoted, boardId },
          });
          if (response) {
            return response.data;
          }
    } catch(e) {

    }
}