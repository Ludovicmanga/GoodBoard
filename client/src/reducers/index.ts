import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import featureRequestsReducer from "./featureRequests.reducer"

export default combineReducers({
    userReducer,
    featureRequestsReducer
})