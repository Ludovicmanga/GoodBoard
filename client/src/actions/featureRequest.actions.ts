import axios from "axios";

export const GET_ALL_FEATURE_REQUESTS = "GET_ALL_FEATURE_REQUESTS";
export const GET_ALL_COMPANY_FEATURE_REQUESTS = "GET_ALL_COMPANY_FEATURE_REQUESTS";
export const GET_ALL_USER_FEATURE_REQUESTS = "GET_ALL_USER_FEATURE_REQUESTS";

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

export const createNewFeatureRequest = (title, details, creatorType, status) => {
    return (dispatch) => {
      return axios
        .post("http://localhost:5000/feature-request/create", {title, details, creatorType, status})
        .then(res => console.log(res))
    };
  };