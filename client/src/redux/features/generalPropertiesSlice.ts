import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuSelected } from '../../helpers/types';

interface GeneralProperties {
    featureRequestModalOpen: boolean;
    menuSelected: MenuSelected;
    mainSnackBar: {
      isOpen: boolean;
      message: string;
    }
}

const initialState: GeneralProperties = {
    featureRequestModalOpen: false,
    menuSelected: MenuSelected.yourIdeas,
    mainSnackBar: {
      isOpen: false,
      message: '',
    }
}

export const generalPropertiesSlice = createSlice({
  name: 'all feature requests',
  initialState,
  reducers: {
    setGeneralProperties: (state, action: PayloadAction<Partial<GeneralProperties>>) => {
        state = { ...state, ...action.payload };
        return state;
      },
  },
})

export const { setGeneralProperties } = generalPropertiesSlice.actions

export default generalPropertiesSlice.reducer