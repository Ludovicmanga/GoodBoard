import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { UserType } from "../helpers/types";
import { setAllFeatureRequests } from "../redux/features/allFeatureRequestsSlice";
import { setLoggedUserState } from "../redux/features/loggedUserSlice";
import { useAppDispatch } from "../redux/hooks";
import Routes from "../Routes";
import "./App.module.scss";

function App() {
  const dispatch = useAppDispatch();
  const getAllUserFeatureRequests = async () => {
    const allUsersFeatureRequests = await axios({
      url: "http://localhost:8080/feature-request/get/all",
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
        url: `http://localhost:8080/users/get/63a5c70dcd60d8df7aecc3f8`,
      });
      console.log(userResponse.data, ' is the user')
      dispatch(setLoggedUserState({
        _id: '63a5c70dcd60d8df7aecc3f8',
        email: userResponse.data.email,
        type: userResponse.data.type,
        voted: userResponse.data.voted,
      }))
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
