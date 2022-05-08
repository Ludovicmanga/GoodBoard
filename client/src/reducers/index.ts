import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import allFeatureRequestsReducer from "./allFeatureRequests.reducer";
import allUserFeatureRequestsReducer from "./allUserFeatureRequests.reducer";
import allCompanyFeatureRequestsReducer from "./allCompanyFeatureRequests.reducer";

export default combineReducers({
    userReducer,
    allFeatureRequestsReducer
})