import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeatureRequestModalMode, MenuSelected, Board, ChangeLog } from "../../helpers/types";

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
    changeLogId: string | null
  };
  manageBoardModalOpen: {
    isOpen: boolean;
    initialStep?: "settings" | "pricings list" | "checkout form"
  };
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
  dialogAlert: {
    isOpen: boolean;
    title: string;
    textDetails: string;
    submitBtnText: string;
    submitBtnColor: "error" | "success"
    handleClose: () => void;
    handleSubmit: () => Promise<void>
  } | null;
}

const initialState: GeneralProperties = {
  activeBoard: undefined,
  featureRequestModal: {
    isOpen: false,
    mode: null,
  },
  generalSettingsModalOpen: false,
  shareBoardModalOpen: false,
  manageBoardModalOpen: {
    isOpen: false
  },
  switchBoardModalOpen: false,
  cannotMakeActionModalOpen: false,
  needToUpgradeModalOpen: false,
  featuresAreLoading: false,
  changeLogDetailsModalOpen: {
    isOpen: false,
    changeLogId: null
  },
  menuSelected: null,
  mainSnackBar: {
    isOpen: false,
    message: "",
  },
  colorMode: null,
  darkMode: null,
  boardsList: [],
  dialogAlert: null
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
