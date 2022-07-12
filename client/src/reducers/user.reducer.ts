import { DOWN_VOTE_USER, UP_VOTE_USER } from "../actions/featureRequest.actions";
import { GET_USER } from "../actions/user.actions";

const initialState = {
    voted: []
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload

        case UP_VOTE_USER:
            return {
                ...state,
                voted: [action.payload.featureRequestId, ...state.voted]
            }

        case DOWN_VOTE_USER:
            return {
                ...state,
                voted: state.voted.filter(id => id !== action.payload.featureRequestId)
            }

        default:
            return state;        
    }
}