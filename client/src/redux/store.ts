import { configureStore } from '@reduxjs/toolkit';
import allFeatureRequestsReducer from './features/allFeatureRequestsSlice';
import generalPropertiesReducer from './features/generalPropertiesSlice';

export const store = configureStore({
  reducer: {
    generalProperties: generalPropertiesReducer,
    allFeatureRequests: allFeatureRequestsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch