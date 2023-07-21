import { useState } from "react";
import styles from "./Login.module.scss";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Divider, Grid } from "@mui/material";
import axios from "axios";
import { AuthPageType, User } from "../../helpers/types";
import { useAppDispatch } from "../../redux/hooks";
import { setLoggedUserState } from "../../redux/features/loggedUserSlice";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
import { websiteUrl } from "../../helpers/constants";
import React from "react";

type Props = {
  authType: AuthPageType;
};

const Login = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonIsLoading, setButtonIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAuthOnEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleAuth();
    }
  };

  const handleGoogleAuth = async (credentialResponse: CredentialResponse) => {
    try {
      setButtonIsLoading(true);
      const userResponse = await axios({
        url: `${websiteUrl}/api/users/login-google`,
        method: "post",
        data: { credentialResponse },
        withCredentials: true,
      });
      if (userResponse.data.user) {
        handleSuccessfulLogin(userResponse.data.user);
      }
      setButtonIsLoading(false);
    } catch (e) {
      setButtonIsLoading(false);
      console.log(e, ' is the error');
    }
  }


  const handleSuccessfulLogin = (user: User) => {
      dispatch(
        setLoggedUserState({
          user,
        })
      );
      navigate("/");
      dispatch(
        setGeneralProperties({
          mainSnackBar: {
            isOpen: true,
            message: `Welcome ${user.email} !`,
          },
        })
      );
  }

  const handleAuth = async () => {
    if (props.authType === AuthPageType.login) {
      setButtonIsLoading(true);
      const userResponse = await axios<{ user: User }>({
        url: `${websiteUrl}/api/users/login`,
        method: "post",
        data: {
          email,
          password,
        },
        withCredentials: true,
      });
      setButtonIsLoading(false);
      if (userResponse.data.user) {
        handleSuccessfulLogin(userResponse.data.user);
      }
    }
    if (props.authType === AuthPageType.signUp) {
      setButtonIsLoading(true);
      const signUpResponse = await axios<{ user: User }>({
        url: `${websiteUrl}/api/users/sign-up`,
        method: "post",
        data: {
          email,
          password,
        },
      });
      setButtonIsLoading(false);
      if (signUpResponse.data.user) {
        navigate("/login");
        dispatch(
          setGeneralProperties({
            mainSnackBar: {
              isOpen: true,
              message: "Successful sign up !",
            },
          })
        );
      }
    }
  };
  
  return (
    <div className={styles.container}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {props.authType === AuthPageType.login ? "Sign In" : "Sign up"}
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="username"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleAuthOnEnter}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Grid container>
              <Grid item xs>
                <Link className={styles.link} href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  className={styles.link}
                  href={
                    props.authType === AuthPageType.login
                      ? `${websiteUrl}/sign-up`
                      : `${websiteUrl}/login`
                  }
                  variant="body2"
                >
                  {props.authType === AuthPageType.login
                    ? "Don't have an account? Sign Up"
                    : "Already have an account? Log in"}
                </Link>
              </Grid>
            </Grid>
            <div className={styles.buttonsContainer}>
              <LoadingButton
                loading={buttonIsLoading}
                onClick={handleAuth}
                fullWidth
                variant="contained"
                className={styles.button}
              >
                {props.authType === AuthPageType.login ? "Sign In" : "Sign up"}
              </LoadingButton>
              <Divider className={styles.divider} />
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  await handleGoogleAuth(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
                useOneTap
              />
            </div>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
