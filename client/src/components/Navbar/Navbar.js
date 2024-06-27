import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import memories from "../../images/memories.png";
import { useTheme } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { signOutUser } from "../../features/slices/posts.js";
import { jwtDecode } from "jwt-decode";
import { fetchPosts } from "../../features/api/index.js";

const Navbar = ({ setUser, user }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const page = 1;
  //const user = useSelector((state) => state.app.user[0]);
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
        borderRadius: 4,
        margin: "2px 2px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 50px",
        width: "100%",

        "@media (max-width:1200px)": {
          display: "flex",
          flexDirection: "column", // Example of a smaller padding for mobile screens
          position: "sticky",
          top: 0,
          zIndex: 100,
          // Add other mobile-specific styles here
        },
      }}
      position="static"
      color="inherit"
    >
      <Link to="/" onClick={() => dispatch(fetchPosts({ page }))}>
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
        </div>{" "}
      </Link>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "flex-end",

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
                margin: {
                  xs: "2px",
                  sm: "4px",
                  lg: "6px",
                },
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
              onClick={() => {
                dispatch(signOutUser());
                setUser(localStorage.removeItem("profile"));
              }}
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
