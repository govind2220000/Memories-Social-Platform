import React, { useState } from "react";
import Input from "./Auth/Input.js";
import { Button, Container, Paper, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { authUrl } from "../features/api/index.js";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(email);
    const { data } = await axios.post(`${authUrl}/forgotpassword`, { email });
    window.alert(`${data}! Redirecting to Login Page`);
    setEmail("");
    navigate("/");
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
          Enter your email
        </Typography>
        <form
          onSubmit={handleSubmit}
          sx={{
            width: "100%", // Fix IE 11 issue.
            marginTop: theme.spacing(3),
          }}
        >
          <Input
            name="email"
            label="Email Address"
            handleChange={handleChange}
            type="email"
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
        </form>
      </Paper>
    </Container>
  );
};
