import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import allFeatureRequestsReducer from "./allFeatureRequests.reducer"

export default combineReducers({
    userReducer,
    allFeatureRequestsReducer
})