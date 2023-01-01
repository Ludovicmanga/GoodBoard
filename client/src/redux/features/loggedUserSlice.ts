import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../helpers/types";

type LoggedUser = {
  user: User | null | undefined;
}

const initialState: LoggedUser = {
  user: undefined,
};

export const loggedUserSlice = createSlice({
  name: "logged user",
  initialState,
  reducers: {
    setLoggedUserState: (state, action: PayloadAction<Partial<LoggedUser>>) => {
      state = { ...state, ...action.payload };
      return state;
    },
    addToVotedFeatures: (
      state,
      action: PayloadAction<{
        featureRequestId: string;
      }>
    ) => {
      if (state.user) {
        state.user.voted = [...state.user.voted, action.payload.featureRequestId];
      }
      return state;
    },
    removeFromVotedFeatures: (
      state,
      action: PayloadAction<{
        featureRequestId: string;
      }>
    ) => {
      if (state.user) {
        state.user.voted = state.user.voted.filter(featureRequestId => featureRequestId !== action.payload.featureRequestId);
      }
      return state;
    },
  },
});

export const { setLoggedUserState, addToVotedFeatures, removeFromVotedFeatures } = loggedUserSlice.actions;

export default loggedUserSlice.reducer;
