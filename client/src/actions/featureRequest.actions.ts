import axios from "axios";

export const GET_ALL_FEATURE_REQUESTS = "GET_ALL_FEATURE_REQUESTS";
export const GET_ALL_COMPANY_FEATURE_REQUESTS = "GET_ALL_COMPANY_FEATURE_REQUESTS";
export const GET_ALL_USER_FEATURE_REQUESTS = "GET_ALL_USER_FEATURE_REQUESTS";
export const UP_VOTE_FEATURE = "UP_VOTE_FEATURE"
export const DOWN_VOTE_FEATURE = "DOWN_VOTE_FEATURE"
export const UP_VOTE_USER = "UP_VOTE_USER"
export const DOWN_VOTE_USER = "DOWN_VOTE_USER"

export const getAllFeatureRequests = () => {
    return (dispatch) => {
        return axios
            .get("http://localhost:5000/feature-request/get/all", { withCredentials: true })
            .then(res => {
                dispatch({ type: GET_ALL_FEATURE_REQUESTS, payload: res.data });
            })
            .catch(error => console.log(error))
    }
}

export const getAllCompanyFeatureRequests = () => {
    return (dispatch) => {
        return axios
            .get("http://localhost:5000/feature-request/get/all-company", { withCredentials: true })
            .then(res => {
                dispatch({ type: GET_ALL_COMPANY_FEATURE_REQUESTS, payload: res.data });
            })
            .catch(error => console.log(error))
    }
}

export const getAllUserFeatureRequests = () => {
    return (dispatch) => {
        return axios
            .get("http://localhost:5000/feature-request/get/all-user", { withCredentials: true })
            .then(res => {
                dispatch({ type: GET_ALL_USER_FEATURE_REQUESTS, payload: res.data });
            })
            .catch(error => console.log(error))
    }
}

export const createNewFeatureRequest = (title, details, creatorType, status, creator) => {
    return (dispatch) => {
        return axios
            .post("http://localhost:5000/feature-request/create", {title, details, creatorType, status, creator})
            .then(res => console.log(res))
    };
};

export const upVote = (featureRequestId, userId) => {
    return (dispatch) => {
        return axios
            .patch(`http://localhost:5000/feature-request/up-vote/${featureRequestId}`, { userId } , { withCredentials: true })
            .then(res => {
                dispatch({ type: UP_VOTE_FEATURE, payload: {featureRequestId, userId} });
                dispatch({ type: UP_VOTE_USER, payload: {featureRequestId} });
            })
            .catch(error => console.log(error))
    }
}

export const downVote = (featureRequestId, userId) => {
    return (dispatch) => {
        return axios
            .patch(`http://localhost:5000/feature-request/down-vote/${featureRequestId}`, { userId }, { withCredentials: true })
            .then(res => {
                dispatch({ type: DOWN_VOTE_FEATURE, payload: {featureRequestId, userId} });
                dispatch({ type: DOWN_VOTE_USER, payload: {featureRequestId} });
            })
            .catch(error => console.log(error))
    }
}