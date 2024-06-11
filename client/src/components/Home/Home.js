import { Container, Grid, Grow, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Posts from "../Posts/Posts.js";
import Form from "../Form/Form.js";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../features/api/index.js";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentId, setCurrentId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts()); //for the very first time it will do the api call and will get all the post but after whenever we perform any action we are directly updating out store and hence our data layer gets updated everytime hence we dont have to pass any dependency in the array to make this callbback run again and again and it works as expected. We have put dispatch since we were receiving warning. But for ideal case we should pass dependencies to get the most updated data
  }, [dispatch, currentId]);
  return (
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
  );
};

export default Home;