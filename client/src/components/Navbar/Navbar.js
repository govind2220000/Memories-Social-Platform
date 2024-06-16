import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import memories from "../../images/memories.png";
import { useTheme } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../features/slices/posts.js";

const Navbar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user[0]);
  //console.log(user);
  return (
    <AppBar
      sx={{
        borderRadius: 15,
        margin: "30px 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px 50px",
      }}
      position="static"
      color="inherit"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          component={Link}
          to={user && "/"}
          variant="h2"
          align="center"
          sx={{
            color: "rgba(0,183,255, 1)",
          }}
        >
          Memories
        </Typography>
        <img
          src={memories}
          alt="memories"
          height="60"
          width=""
          sx={{
            marginLeft: "15px",
          }}
        ></img>
      </div>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "500px",
        }}
      >
        {user ? (
          <div className="test">
            {/* {console.log(typeof user, 12)} */}
            <Avatar
              alt={user?.userName || user?.result?.name}
              src={user?.image}
              sx={{
                margin: "auto",
              }}
            >
              {user?.userName?.charAt(0) || user?.result?.name?.charAt(0)}
            </Avatar>
            {/* user?.result?.name => this structure is followed for normal signin/signup */}
            {/* user?.userName => this structure is being followed for googleSignIn/SignUp  */}
            <Typography variant="h6">
              {user?.userName || user?.result?.name}
            </Typography>
            <Button
              onClick={() => dispatch(signOutUser())}
              variant="contained"
              color="secondary"
              sx={{ display: "insetInline" }}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <Button
            sx={{
              color: theme.palette.getContrastText(deepPurple[500]),
              backgroundColor: deepPurple[500],
            }}
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In / Sign Up
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
