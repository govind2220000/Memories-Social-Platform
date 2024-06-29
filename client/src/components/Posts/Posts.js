import React from "react";
import Post from "./Post/Post.js";
import { Grid, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state?.app?.posts?.data);
  const isLoading = useSelector((state) => state?.app?.loading);
  //console.log(posts[0]);
  const currentPosts = posts?.slice(0, 8);
  if (!posts?.length && !isLoading) return "No posts";

  return isLoading ? (
    <CircularProgress></CircularProgress>
  ) : (
    <Grid
      container
      alignItems="stretch"
      spacing={3}
      className="AAAAA"
      sx={{ width: "fullWidth", marginLeft: { sm: "auto" } }}
    >
      {currentPosts?.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId}></Post>
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
