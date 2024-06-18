import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import memories from "../../images/memories.png";
import { useTheme } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../features/slices/posts.js";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user[0]);
  //console.log(user);
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      //console.log(decodedToken);
      if (decodedToken.exp * 1000 < new Date().getTime())
        dispatch(signOutUser());
    }
  });
  return (
    <AppBar
      sx={{
        borderRadius: 15,
        margin: "30px 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 50px",
        "@media (max-width:600px)": {
          display: "flex",
          flexDirection: "column", // Example of a smaller padding for mobile screens
          // Add other mobile-specific styles here
        },
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
            textDecoration: "none",
            fontSize: {
              xs: "2rem", // Smaller text size for extra-small screens
              sm: "2.5rem", // Slightly larger text size for small screens
              md: "3rem", // Default text size for medium screens and up
            },
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
          justifyContent: "center",
          width: {
            xs: "100%", // Full width on extra-small screens
            sm: "500px", // Fixed width on small screens and up
          },
          whiteSpace: "nowrap", // Keeps the text in a single line
          overflow: "hidden", // Prevents text from overflowing
          textOverflow: "ellipsis",
        }}
      >
        {user ? (
          <div
            className="test"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center", // Center horizontally
              width: "100%", // Take full width to allow centering
              margin: "15px",
            }}
          >
            {/* {console.log(typeof user, 12)} */}
            <Avatar
              alt={user?.userName || user?.result?.name}
              src={user?.image}
              sx={{}}
            >
              {user?.userName?.charAt(0) || user?.result?.name?.charAt(0)}
            </Avatar>
            {/* user?.result?.name => this structure is followed for normal signin/signup */}
            {/* user?.userName => this structure is being followed for googleSignIn/SignUp  */}
            <Typography
              variant="h6"
              sx={{
                margin: "5px",
                fontSize: {
                  xs: "0.9rem", // Smaller text size for extra-small screens
                  sm: "1.5rem", // Slightly larger text size for small screens
                  md: "2rem", // Default text size for medium screens and up
                },
              }}
            >
              {user?.userName || user?.result?.name}
            </Typography>
            <Button
              onClick={() => dispatch(signOutUser())}
              variant="contained"
              color="secondary"
              sx={{
                display: "insetInline",
                margin: "5px",

                fontSize: {
                  xs: "12px",
                  md: "15px",
                },
              }}
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
