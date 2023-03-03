import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuSelected } from "../../helpers/types";

interface GeneralProperties {
  activeBoard: string | null;
  featureRequestModalOpen: boolean;
  generalSettingsModalOpen: boolean;
  shareBoardModalOpen: boolean;
  switchBoardModalOpen: boolean;
  menuSelected: MenuSelected | null;
  mainSnackBar: {
    isOpen: boolean;
    message: string;
  };
  colorMode: 'light' | 'dark' | null;
}

const initialState: GeneralProperties = {
  activeBoard: null,
  featureRequestModalOpen: false,
  generalSettingsModalOpen: false,
  shareBoardModalOpen: false,
  switchBoardModalOpen: false,
  menuSelected: null,
  mainSnackBar: {
    isOpen: false,
    message: "",
  },
  colorMode: null,
};

export const generalPropertiesSlice = createSlice({
  name: "all feature requests",
  initialState,
  reducers: {
    setGeneralProperties: (
      state,
      action: PayloadAction<Partial<GeneralProperties>>
    ) => {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export const { setGeneralProperties } = generalPropertiesSlice.actions;

export default generalPropertiesSlice.reducer;
