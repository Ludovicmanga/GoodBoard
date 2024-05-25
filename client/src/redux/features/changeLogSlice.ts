import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board, ChangeLog } from "../../helpers/types";

const initialState: ChangeLog[] = [];

export const changelogSlice = createSlice({
  name: "changelog",
  initialState,
  reducers: {
    setAllChangelogItems: (
      state,
      action: PayloadAction<ChangeLog[]>
    ) => {
      state = action.payload;
      return state;
    },
    updateVoteOneChangeLogItem: (
        state,
        action: PayloadAction<Partial<{
            changeLogId: string;
            userId: string;
            direction: "up" | "down",
            emoji: "happy" | "middle" | "sad"
        }>>
      ) => {
        state = state.map(changeL => {
            if (changeL._id === action.payload.changeLogId) {
                if (action.payload.emoji === "happy") {
                    if (action.payload.direction === "up") {
                        changeL.happyEmojiVoters.push(action.payload.userId!);
                        return changeL;
                    } else {
                        changeL.happyEmojiVoters = changeL.happyEmojiVoters.filter(c => c !== action.payload.userId);
                        return changeL;
                    }
                } else if (action.payload.emoji === "middle") {
                    if (action.payload.direction === "up") {
                        changeL.middleEmojiVoters.push(action.payload.userId!);
                        return changeL;
                    } else {
                        changeL.middleEmojiVoters = changeL.middleEmojiVoters.filter(c => c !== action.payload.userId);
                        return changeL;
                    }
                } else {
                    if (action.payload.direction === "up") {
                        changeL.sadEmojiVoters.push(action.payload.userId!);
                        return changeL;
                    } else {
                        changeL.sadEmojiVoters = changeL.sadEmojiVoters.filter(c => c !== action.payload.userId);
                        return changeL;
                    }
                }
            } else {
                return changeL;
            }
        })
      },
  },
});

export const { setAllChangelogItems, updateVoteOneChangeLogItem } = changelogSlice.actions;

export default changelogSlice.reducer;
