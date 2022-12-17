import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { setAllFeatureRequests } from "../redux/features/allFeatureRequestsSlice";
import { useAppDispatch } from "../redux/hooks";
import Routes from "../Routes";
import "./App.module.scss";

function myVar () {
  console.log('hey')
}

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
    getAll();
  }, []);

  return (
    <GoogleOAuthProvider clientId="359793701193-uesb1dbegpv1batpku2ro9le0fjnf8il.apps.googleusercontent.com">
        <Routes />
    </GoogleOAuthProvider>
  );
}

export default App;
