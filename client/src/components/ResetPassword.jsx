import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { authUrl } from "../features/api/index.js";
import { useNavigate, useParams } from "react-router-dom";
import Input from "./Auth/Input.js";

const ResetPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(password);
    {
      if (password.password === password.confirmPassword) {
      } else {
        window.alert("Passwords don't match");
        return;
      }
    }
    const { data } = await axios.post(
      `${authUrl}/resetPassword/${id}/${token}`,
      password
    );
    //console.log(data);
    window.alert(`${data}! Redirecting to Login Page`);
    setPassword({
      password: "",
      confirmPassword: "",
    });
    navigate("/");
  };
  const handleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };
  return (
    <Container maxWidth="sm">
      <Paper
        sx={{
          marginTop: theme.spacing(8),

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: theme.spacing(2),
          width: "maxWidth",
        }}
      >
        <Typography variant="h5" align="center" sx={{ margin: "15px" }}>
          Enter Your New Password Details
        </Typography>
        <form
          onSubmit={handleSubmit}
          sx={{
            width: "100%", // Fix IE 11 issue.
            marginTop: theme.spacing(3),
            display: "flex",
          }}
        >
          <Grid container spacing={2}>
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            <Input
              name="confirmPassword"
              label="Repeat Password"
              handleChange={handleChange}
              type="password"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              align="center"
              sx={{
                margin: theme.spacing(3, 0, 2),
                margin: "auto",
                marginTop: "15px",
                width: "100%",
                paddingRight: "2px",
              }}
            >
              Submit
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
