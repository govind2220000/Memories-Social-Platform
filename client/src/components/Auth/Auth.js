import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Paper,
  Avatar,
  Container,
  Button,
  useTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input.js";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { googlesignInUser } from "../../features/slices/posts.js";
import { useNavigate } from "react-router-dom";
import { signInUser, signUpUser } from "../../features/api/index.js";
import LoadingDialog from "../Loading.jsx";

const Auth = ({ user, setUser }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.app.loading);
  //console.log(user);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //console.log(user);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  //const googleSuccess = async (response) => console.log(response);
  useEffect(() => {
    console.log("inuseEffext");
    if (user) {
      console.log("inuseEffext if block");
      //setIsSignup(false);
      navigate("/");
    }
  }, []);
  const googleSuccess = async (response) => {
    console.log(response);
    const decoded = jwt_decode(response.credential);
    console.log(decoded);
    const { name, picture, sub, email } = decoded;

    const user = {
      _id: sub,
      _type: "user",
      email: email,
      userName: name,
      image: picture,
      token: response.credential,
    };

    try {
      dispatch(googlesignInUser(user));
      setUser(JSON.parse(localStorage.getItem("profile")));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (err) => {
    console.log(err);
    console.log("Google Sign in Failed. Please try again later");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      if (isSignup) {
        dispatch(signUpUser({ formData, navigate, setUser }));
      } else {
        dispatch(signInUser({ formData, navigate, setUser }));
      }
    }

    console.log(formData);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); //this way we can store multiple form data using one function instead of using it seperately
  };
  const handleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };
  const switchMode = () => {
    setIsSignup((isSignup) => !isSignup);
    setShowPassword(false);
  };

  if (loading) {
    return <LoadingDialog></LoadingDialog>;
  }

  return (
    <Container maxWidth="xs">
      <Paper
        sx={{
          marginTop: theme.spacing(8),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: theme.spacing(2),
        }}
      >
        <Avatar
          sx={{
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <LockOutlinedIcon></LockOutlinedIcon>
        </Avatar>
        <Typography variant="h5" align="center" sx={{ margin: "auto" }}>
          {isSignup ? "Sign Up" : "Sign In"}
        </Typography>
        <form
          onSubmit={handleSubmit}
          sx={{
            width: "100%", // Fix IE 11 issue.
            marginTop: theme.spacing(3),
          }}
        >
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="FirstName"
                  handleChange={handleChange}
                  autoFocus
                  half
                  type="text"
                ></Input>
                <Input
                  name="lastName"
                  label="LastName"
                  handleChange={handleChange}
                  half
                  type="text"
                ></Input>
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              align="center"
              sx={{
                margin: theme.spacing(3, 0, 2),
                marginLeft: "16px",
                marginRight: "0px",
                width: "100%",
                paddingRight: "2px",
              }}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>

            {user ? (
              <div>Logged In</div>
            ) : (
              <div style={{ margin: "auto", paddingLeft: "20px" }}>
                <GoogleLogin
                  onSuccess={googleSuccess}
                  onError={googleFailure}
                ></GoogleLogin>
              </div>
            )}
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Button
                onClick={switchMode}
                sx={{
                  margin: theme.spacing(3, 0, 2),
                }}
              >
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
