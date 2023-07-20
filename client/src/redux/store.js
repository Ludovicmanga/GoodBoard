import { configureStore } from '@reduxjs/toolkit';
import allFeatureRequestsReducer from './features/allFeatureRequestsSlice';
import generalPropertiesReducer from './features/generalPropertiesSlice';
import loggedUserReducer from './features/loggedUserSlice';
export var store = configureStore({
    reducer: {
        generalProperties: generalPropertiesReducer,
        allFeatureRequests: allFeatureRequestsReducer,
        loggedUser: loggedUserReducer
    }
});
