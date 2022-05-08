import {  DOWN_VOTE_FEATURE, GET_ALL_FEATURE_REQUESTS, UP_VOTE_FEATURE } from "../actions/featureRequest.actions";

const initialState: any = {};

export default function allFeatureRequestsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_FEATURE_REQUESTS:
            return action.payload

        case UP_VOTE_FEATURE:
            return state.map(featureRequest => {
                if (featureRequest._id === action.payload.featureRequestId) {
                    return {
                        ...featureRequest,
                        voters: [action.payload.userId, ...featureRequest.voters]
                    }
                }
                return featureRequest
            })

        case DOWN_VOTE_FEATURE:
            return state.map(featureRequest => {
                if (featureRequest._id === action.payload.featureRequestId) {
                    return {
                        ...featureRequest,
                        voters: featureRequest.voters.filter(id => id !== action.payload.userId)
                    }
                } 
                return featureRequest
            })
    
        default:
            return state;
    }
}