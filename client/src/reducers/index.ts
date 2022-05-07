import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import allFeatureRequestsReducer from "./allFeatureRequests.reducer";
import allUserFeatureRequests from "./allUserFeatureRequests.reducer";
import allCompanyFeatureRequests from "./allCompanyFeatureRequests.reducer";

export default combineReducers({
    userReducer,
    allFeatureRequestsReducer,
    allUserFeatureRequests,
    allCompanyFeatureRequests
})