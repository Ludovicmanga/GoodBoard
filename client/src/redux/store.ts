import { configureStore } from '@reduxjs/toolkit';
import allFeatureRequestsReducer from './features/allFeatureRequestsSlice';
import generalPropertiesReducer from './features/generalPropertiesSlice';
import loggedUserReducer from './features/loggedUserSlice';
import activeBoardReducer from './features/activeBoardSlice';
import changelogReducer from './features/changeLogSlice'

export const store = configureStore({
  reducer: {
    generalProperties: generalPropertiesReducer,
    allFeatureRequests: allFeatureRequestsReducer,
    loggedUser: loggedUserReducer,
    activeBoard: activeBoardReducer,
    changeLog: changelogReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch