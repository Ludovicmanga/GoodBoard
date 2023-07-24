import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuSelected } from "../../helpers/types";

interface GeneralProperties {
  activeBoard: string | null;
  featureRequestModalOpen: boolean;
  generalSettingsModalOpen: boolean;
  shareBoardModalOpen: boolean;
  switchBoardModalOpen: boolean;
  manageBoardModalOpen: boolean;
  cannotMakeActionModalOpen: boolean;
  needToUpgradeModalOpen: boolean;
  menuSelected: MenuSelected | null;
  mainSnackBar: {
    isOpen: boolean;
    message: string;
  };
  darkMode: boolean | null;
  colorMode: string | null;
}

const initialState: GeneralProperties = {
  activeBoard: null,
  featureRequestModalOpen: false,
  generalSettingsModalOpen: false,
  shareBoardModalOpen: false,
  manageBoardModalOpen: false,
  switchBoardModalOpen: false,
  cannotMakeActionModalOpen: false,
  needToUpgradeModalOpen: false,
  menuSelected: null,
  mainSnackBar: {
    isOpen: false,
    message: "",
  },
  colorMode: null,
  darkMode: null,
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
