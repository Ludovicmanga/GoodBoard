import { Alert, Snackbar } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import React from "react";
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

  const getAllUserFeatureRequests = async () => {
    const allUsersFeatureRequests = await axios({
      url: `${websiteUrl}/api/feature-request/get/all`,
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
    getAll();
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
