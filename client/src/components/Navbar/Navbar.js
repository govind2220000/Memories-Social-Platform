import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import memories from "../../images/memories.png";
import { useTheme } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

const Navbar = () => {
  const theme = useTheme();
  const user = null;
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
          to="/"
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
          <div>
            <Avatar alt={user?.result.name} src={user?.result.imageUrl}>
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" color="secondary"></Button>
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
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
