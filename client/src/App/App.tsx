import { Alert, Snackbar } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { websiteUrl } from "../helpers/constants";
import { setAllFeatureRequests } from "../redux/features/allFeatureRequestsSlice";
import { setGeneralProperties } from "../redux/features/generalPropertiesSlice";
import { setLoggedUserState } from "../redux/features/loggedUserSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Routes from "../Routes";
import "./App.module.scss";

function App() {
  const dispatch = useAppDispatch();
  const generalPropertiesState = useAppSelector(
    (state) => state.generalProperties
  );

  const getAllBoardFeatureRequestsApiCall = async (activeBoard: string) => {
    const allUsersFeatureRequests = await axios({
      url: `${websiteUrl}/api/feature-request/get/all-from-board`,
      method: 'post',
      data: {
        boardId: activeBoard,
      },
      withCredentials: true,
    });
    return allUsersFeatureRequests.data;
  };

  const getAllBoardFeatureRequests = async (activeBoard: string) => {
    const allFeatureRequests = await getAllBoardFeatureRequestsApiCall(activeBoard);
    dispatch(setAllFeatureRequests(allFeatureRequests));
  };

  useEffect(() => {
    dispatch(setGeneralProperties({
      activeBoard: localStorage.getItem('board'),
    }))
  }, [])

  useEffect(() => {
    if (generalPropertiesState.activeBoard && generalPropertiesState.activeBoard.length > 0) {
      getAllBoardFeatureRequests(generalPropertiesState.activeBoard);
    }
  }, [generalPropertiesState.activeBoard])

  useEffect(() => {
    const getLoggedUser = async () => {
      const userResponse = await axios({
        url: `${websiteUrl}/api/users/checkIfAuthenticated`,
        withCredentials: true,
      });
      if (userResponse.data.user) {
        const user = userResponse.data.user;
        dispatch(
          setLoggedUserState({
            user: {
              _id: user._id,
              email: user.email,
              type: user.type,
              voted: user.voted,
            },
          })
        );
      }
      if (userResponse.data.notAuthenticated) {
        dispatch(
          setLoggedUserState({
            user: null,
          })
        );
      }
    };
    getLoggedUser();
  }, []);

  return (
    <GoogleOAuthProvider clientId="359793701193-uesb1dbegpv1batpku2ro9le0fjnf8il.apps.googleusercontent.com">
      <>
        <Snackbar
          open={generalPropertiesState.mainSnackBar.isOpen}
          autoHideDuration={4000}
          onClose={() => {
            dispatch(
              setGeneralProperties({
                mainSnackBar: {
                  isOpen: false,
                  message: "",
                },
              })
            );
          }}
        >
          <Alert
            onClose={() => {
              dispatch(
                setGeneralProperties({
                  mainSnackBar: {
                    isOpen: false,
                    message: "",
                  },
                })
              );
            }}
            severity="success"
            sx={{ width: "100%" }}
          >
            {generalPropertiesState.mainSnackBar.message}
          </Alert>
        </Snackbar>
        <Routes />
      </>
    </GoogleOAuthProvider>
  );
}

export default App;
