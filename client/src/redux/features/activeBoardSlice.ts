import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board } from "../../helpers/types";

const initialState: Board = {
    _id: '',
    name: '',
    description: '',
    picture: '',
    themeColor: '',
    websiteUrl: '',
    billingPlan: null
};
export const activeBoardSlice = createSlice({
  name: "active board properties",
  initialState,
  reducers: {
    setActiveBoardData: (
      state,
      action: PayloadAction<Partial<Board>>
    ) => {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export const { setActiveBoardData } = activeBoardSlice.actions;

export default activeBoardSlice.reducer;
