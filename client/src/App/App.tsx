import {
  Alert,
  createTheme,
  CssBaseline,
  Snackbar,
  ThemeProvider,
} from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { crispWebsiteId, websiteUrl } from "../helpers/constants";
import { setAllFeatureRequests } from "../redux/features/allFeatureRequestsSlice";
import { setGeneralProperties } from "../redux/features/generalPropertiesSlice";
import { setLoggedUserState } from "../redux/features/loggedUserSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Routes from "../Routes";
import "./App.module.scss";
import { getLoggedUser } from "../helpers/users";
import FeatureRequestModal from "../components/Modals/FeatureRequestModal/FeatureRequestModal";
import { checkUserAccessAPICall } from "../helpers/boards";
import LoadingSkeleton from "../components/LoadingSkeleton/LoadingSkeleton";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import { Crisp } from "crisp-sdk-web";
import { DarkMode } from "@mui/icons-material";

Crisp.configure(crispWebsiteId);

function App() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const generalPropertiesState = useAppSelector(
    (state) => state.generalProperties
  );
  const loggedUserState = useAppSelector((state) => state.loggedUser).user;

  const handleCreateTheme = (primaryColor: string, secondaryColor: string) =>
    createTheme({
      palette: {
        primary: {
          main: primaryColor,
        },
        secondary: {
          main: secondaryColor,
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
      theme: handleCreateTheme("#d3f9d8", "#ebfbee"),
    },
    {
      color: "blue",
      theme: handleCreateTheme("#d0ebff", "#e7f5ff"),
    },
    {
      color: "yellow",
      theme: handleCreateTheme("#fff3bf", "#fff9db"),
    },
    {
      color: "red",
      theme: handleCreateTheme("#ffc9c9", "#ffe3e3"),
    },
    {
      color: "purple",
      theme: handleCreateTheme("#d0bfff", "#e5dbff"),
    },
    {
      color: "teal",
      theme: handleCreateTheme("#96f2d7", "#c3fae8"),
    },
    {
      color: "orange",
      theme: handleCreateTheme("#ffd8a8", "#ffe8cc"),
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
      dispatch(
        setGeneralProperties({
          activeBoard: null,
        })
      );
    } else {
      return allUsersFeatureRequests.data;
    }
  };

  const getAllBoardFeatureRequests = async (activeBoard: string) => {
    dispatch(
      setGeneralProperties({
        featuresAreLoading: true,
      })
    );
    const allFeatureRequests = await getAllBoardFeatureRequestsApiCall(
      activeBoard
    );
    dispatch(setAllFeatureRequests(allFeatureRequests));
    dispatch(
      setGeneralProperties({
        featuresAreLoading: false,
      })
    );
  };

  useEffect(() => {
    const checkUserHasAccessToBoard = async (boardId: string | null) => {
      if (boardId) {
        const res = await checkUserAccessAPICall(boardId);
        if (res.data.hasAccessToActiveBoard) {
          dispatch(
            setGeneralProperties({
              activeBoard: boardId,
            })
          );
        } else {
          dispatch(
            setGeneralProperties({
              activeBoard: null,
            })
          );
        }
        dispatch(
          setGeneralProperties({
            boardsList: res.data.boardsUserHasAccessList,
          })
        );
      }
    };
    if (localStorage.getItem("board")) {
      checkUserHasAccessToBoard(localStorage.getItem("board"));
    } else {
      dispatch(
        setGeneralProperties({
          activeBoard: null,
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (generalPropertiesState.activeBoard) {
      getAllBoardFeatureRequests(generalPropertiesState.activeBoard);
    }
  }, [generalPropertiesState.activeBoard]);

  const handleGetLoggedUser = async () => {
    const userResponse = await getLoggedUser(
      generalPropertiesState.activeBoard
    );
    if (userResponse) {
      if (userResponse.data.user) {
        const user = userResponse.data.user;
        dispatch(
          setLoggedUserState({
            user: {
              _id: user._id,
              email: user.email,
              roleOnThisBoard: userResponse.data.roleUserOnThisBoard,
              voted: user.voted,
              picture: user.picture,
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
    }
  };

  useEffect(() => {
    handleGetLoggedUser();
  }, [generalPropertiesState.activeBoard]);

  useEffect(() => {
    if (
      loggedUserState !== undefined &&
      generalPropertiesState.activeBoard !== undefined
    ) {
      setIsLoading(false);
    }
  }, [loggedUserState, generalPropertiesState.activeBoard]);

  useEffect(() => {
    console.log(generalPropertiesState.darkMode, " is the darkmode");
  }, [generalPropertiesState.darkMode]);

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
                )?.theme || handleCreateTheme("#a5d8ff", "#d0ebff")
          }
        >
          <ErrorBoundary>
            {isLoading ? <LoadingSkeleton /> : <Routes />}
          </ErrorBoundary>

          <CssBaseline />
        </ThemeProvider>
        <FeatureRequestModal
          modalMode={generalPropertiesState.featureRequestModal.mode!}
          modalIsOpen={generalPropertiesState.featureRequestModal.isOpen}
          handleCloseModal={() =>
            dispatch(
              setGeneralProperties({
                featureRequestModal: { isOpen: false, mode: null },
              })
            )
          }
        />
      </>
    </GoogleOAuthProvider>
  );
}

export default App;
