import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuSelected, User } from "../../helpers/types";

const initialState: User = {
  _id: "",
  email: "",
  type: null,
  voted: [],
};

export const loggedUserSlice = createSlice({
  name: "logged user",
  initialState,
  reducers: {
    setLoggedUserState: (state, action: PayloadAction<Partial<User>>) => {
      state = { ...state, ...action.payload };
      return state;
    },
    addToVotedFeatures: (
      state,
      action: PayloadAction<{
        featureRequestId: string;
      }>
    ) => {
      state.voted = [...state.voted, action.payload.featureRequestId];
      return state;
    },
    removeFromVotedFeatures: (
      state,
      action: PayloadAction<{
        featureRequestId: string;
      }>
    ) => {
      state.voted = state.voted.filter(featureRequestId => featureRequestId !== action.payload.featureRequestId);
      return state;
    },
  },
});

export const { setLoggedUserState, addToVotedFeatures, removeFromVotedFeatures } = loggedUserSlice.actions;

export default loggedUserSlice.reducer;
