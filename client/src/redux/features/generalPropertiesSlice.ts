import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuSelected } from '../../helpers/types';

interface GeneralProperties {
    featureRequestModalOpen: boolean;
    menuSelected: MenuSelected;
}

const initialState: GeneralProperties = {
    featureRequestModalOpen: false,
    menuSelected: MenuSelected.yourIdeas,
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