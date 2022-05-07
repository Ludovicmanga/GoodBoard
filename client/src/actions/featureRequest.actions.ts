import axios from "axios";

export const GET_ALL_FEATURE_REQUESTS = "GET_ALL_FEATURE_REQUESTS";

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