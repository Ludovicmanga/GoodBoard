import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeatureRequestModalMode, MenuSelected, Board } from "../../helpers/types";

interface GeneralProperties {
  activeBoard: string | null | undefined;
  featureRequestModal: {
    isOpen: boolean;
    mode: FeatureRequestModalMode | null;
  };
  generalSettingsModalOpen: boolean;
  shareBoardModalOpen: boolean;
  switchBoardModalOpen: boolean;
  changeLogDetailsModalOpen: {
    isOpen: boolean;
    title: string;
    details: string;
    createdAt: string;
  };
  manageBoardModalOpen: boolean;
  cannotMakeActionModalOpen: boolean;
  needToUpgradeModalOpen: boolean;
  menuSelected: MenuSelected | null;
  featuresAreLoading: boolean;
  mainSnackBar: {
    isOpen: boolean;
    message: string;
  };
  darkMode: boolean | null;
  colorMode: string | null;
  boardsList: Board[]
}

const initialState: GeneralProperties = {
  activeBoard: undefined,
  featureRequestModal: {
    isOpen: false,
    mode: null,
  },
  generalSettingsModalOpen: false,
  shareBoardModalOpen: false,
  manageBoardModalOpen: false,
  switchBoardModalOpen: false,
  cannotMakeActionModalOpen: false,
  needToUpgradeModalOpen: false,
  featuresAreLoading: false,
  changeLogDetailsModalOpen: {
    isOpen: false,
    title: '',
    details: '',
    createdAt: '',
  },
  menuSelected: null,
  mainSnackBar: {
    isOpen: false,
    message: "",
  },
  colorMode: null,
  darkMode: null,
  boardsList: []
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
    addBoardToList: (state, action: PayloadAction<Board>) => {
      const newBoardsList = [...state.boardsList, action.payload];
      return {
        ...state,
        boardsList: newBoardsList,
      };
    },
  },
});

export const { setGeneralProperties, addBoardToList } = generalPropertiesSlice.actions;

export default generalPropertiesSlice.reducer;
