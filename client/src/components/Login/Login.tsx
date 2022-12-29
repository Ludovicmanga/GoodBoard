import React, { useState } from "react";
import styles from "./Login.module.scss";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { GoogleLogin } from "@react-oauth/google";
import { Divider } from "@mui/material";
import axios from "axios";
import { AuthPageType, UserType } from "../../helpers/types";

type Props = {
  authType: AuthPageType;
};

const Login = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    if (props.authType === AuthPageType.login) {
      await axios({
        url: "http://localhost:8080/users/login",
        method: "post",
        data: {
          email,
          password,
        },
        withCredentials: true,
      });
    }
    if (props.authType === AuthPageType.signUp) {
      await axios({
        url: "http://localhost:8080/users/sign-up",
        method: "post",
        data: {
          email,
          password,
          type: UserType.admin
        }
      });
    }
  }

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
            { props.authType === AuthPageType.login ? 'Sign In' :  'Sign up' }
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={(e) => setEmail(e.target.value) }
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
              onChange={(e) => setPassword(e.target.value) }
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <div className={styles.buttonsContainer}>
              <Button
                onClick={handleAuth}
                fullWidth
                variant="contained"
                className={styles.button}
              >
                { props.authType === AuthPageType.login ? 'Sign In' :  'Sign up' }
              </Button>
              <Divider className={styles.divider} />
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
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
