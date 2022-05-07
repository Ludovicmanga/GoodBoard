import { GET_ALL_COMPANY_FEATURE_REQUESTS } from "../actions/featureRequest.actions";

const initialState = {};

export default function allCompanyFeatureRequests(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_COMPANY_FEATURE_REQUESTS:
            return action.payload

        default:
            return state;
    }
}