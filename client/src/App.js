import React, { useEffect, useState } from "react";
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import memories from "./images/memories.png";
import Posts from "./components/Posts/Posts.js";
import Form from "./components/Form/Form.js";
import { useDispatch } from "react-redux";
import { fetchPosts } from "./features/api/index.js";

const App = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(fetchPosts()); //for the very first time it will do the api call and will get all the post but after whenever we perform any action we are directly updating out store and hence our data layer gets updated everytime hence we dont have to pass any dependency in the array to make this callbback run again and again and it works as expected. We have put dispatch since we were receiving warning. But for ideal case we should pass dependencies to get the most updated data
  }, [dispatch, currentId]);
  return (
    <Container maxWidth="lg">
      <AppBar
        sx={{
          borderRadius: 15,
          margin: "30px 0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        position="static"
        color="inherit"
      >
        <Typography
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
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
            direction={isMobile ? "column-reverse" : "row"}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId}></Posts>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
