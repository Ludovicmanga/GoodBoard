import {
  Alert,
  createTheme,
  CssBaseline,
  Snackbar,
  ThemeProvider,
} from "@mui/material";
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
import CannotMakeActionAsGuestModal from "../components/Modals/CannotMakeActionAsGuestModal/CannotMakeActionAsGuestModal";
import { getLoggedUser } from "../helpers/users";

function App() {
  const dispatch = useAppDispatch();

  const generalPropertiesState = useAppSelector(
    (state) => state.generalProperties
  );
  const loggedUserState = useAppSelector(
    (state) => state.loggedUser
  );

  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const greenTheme = createTheme({
    palette: {
      primary: {
        main: "#469C63",
      },
      secondary: {
        main: "#6EC382",
      },
    },
  });

  const redTheme = createTheme({
    palette: {
      primary: {
        main: "#F43C2B",
      },
      secondary: {
        main: "#E27476",
      },
    },
  });

  const yellowTheme = createTheme({
    palette: {
      primary: {
        main: "#EDD91A",
      },
      secondary: {
        main: "#FFE600",
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "rgba(0, 0, 0)",
      },
    },
  });

  const themes = [
    {
      color: "green",
      theme: greenTheme,
    },
    {
      color: "blue",
      theme: lightTheme,
    },
    {
      color: "yellow",
      theme: yellowTheme,
    },
    {
      color: "red",
      theme: redTheme,
    },
  ];

  const getAllBoardFeatureRequestsApiCall = async (activeBoard: string) => {
    const allUsersFeatureRequests = await axios({
      url: `${websiteUrl}/api/feature-request/get/all-from-board`,
      method: "post",
      data: {
        boardId: activeBoard,
      },
      withCredentials: true,
    });
    if (
      allUsersFeatureRequests.data === "user doesn't have access to the board"
    ) {
      console.log(
        "Afficher un simple message derreur indiquant que lutilisateur n a pas acces au board, qui est privé"
      );
    } else {
      return allUsersFeatureRequests.data;
    }
  };

  const getAllBoardFeatureRequests = async (activeBoard: string) => {
    const allFeatureRequests = await getAllBoardFeatureRequestsApiCall(
      activeBoard
    );
    dispatch(setAllFeatureRequests(allFeatureRequests));
  };

  useEffect(() => {
    dispatch(
      setGeneralProperties({
        activeBoard: localStorage.getItem("board"),
      })
    );
  }, []);

  useEffect(() => {
    if (
      generalPropertiesState.activeBoard &&
      generalPropertiesState.activeBoard.length > 0
    ) {
      getAllBoardFeatureRequests(generalPropertiesState.activeBoard);
    }
  }, [generalPropertiesState.activeBoard]);

  const handleGetLoggedUser = async () => {
    const userResponse = await getLoggedUser(generalPropertiesState.activeBoard);
    if (userResponse.data.user) {
      const user = userResponse.data.user;
      dispatch(
        setLoggedUserState({
          user: {
            _id: user._id,
            email: user.email,
            roleOnThisBoard: userResponse.data.roleUserOnThisBoard,
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

  useEffect(() => {
    handleGetLoggedUser();
  }, [generalPropertiesState.activeBoard, dispatch, loggedUserState.user]);

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
        <ThemeProvider
          theme={
            generalPropertiesState.darkMode === true
              ? darkTheme
              : themes.find(
                  (colorTheme) =>
                    colorTheme.color === generalPropertiesState.colorMode
                )?.theme || lightTheme
          }
        >
          <Routes />
          <CssBaseline />
        </ThemeProvider>
      </>
      <CannotMakeActionAsGuestModal
        modalIsOpen={generalPropertiesState.cannotMakeActionModalOpen}
        handleClose={() =>
          dispatch(
            setGeneralProperties({
              cannotMakeActionModalOpen: false,
            })
          )
        }
      />
    </GoogleOAuthProvider>
  );
}

export default App;
