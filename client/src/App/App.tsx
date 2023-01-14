import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { setAllFeatureRequests } from "../redux/features/allFeatureRequestsSlice";
import { setLoggedUserState } from "../redux/features/loggedUserSlice";
import { useAppDispatch } from "../redux/hooks";
import Routes from "../Routes";
import "./App.module.scss";

function App() {
  const dispatch = useAppDispatch();
  const getAllUserFeatureRequests = async () => {
    const allUsersFeatureRequests = await axios({
      url: "https://goodboard-app.herokuapp.com/api/feature-request/get/all",
      withCredentials: true,
    });
    return allUsersFeatureRequests.data;
  };

  useEffect(() => {
    const getAll = async () => {
      const allFeatureRequests = await getAllUserFeatureRequests();
      dispatch(setAllFeatureRequests(allFeatureRequests));
    };
    const getLoggedUser = async () => {
      const userResponse = await axios({
        url: `https://goodboard-app.herokuapp.com/api/users/checkIfAuthenticated`,
        withCredentials: true,
      });
      if (userResponse.data.user) {
        const user = userResponse.data.user;
        dispatch(setLoggedUserState({
          user: {
            _id: user._id,
            email: user.email,
            type: user.type,
            voted: user.voted,
          }
        }))
      }
      if (userResponse.data.notAuthenticated) {
        dispatch(setLoggedUserState({
          user: null,
        }))
      }
    };
    getLoggedUser();
    getAll();
  }, []);

  return (
    <GoogleOAuthProvider clientId="359793701193-uesb1dbegpv1batpku2ro9le0fjnf8il.apps.googleusercontent.com">
        <Routes />
    </GoogleOAuthProvider>
  );
}

export default App;
