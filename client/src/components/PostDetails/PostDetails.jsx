import { CircularProgress, Divider, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchPostsById,
  fetchPostsBySearch,
} from "../../features/api/index.js";
import useStyles from "./PostDetailsStyles.js";
import moment from "moment";

const PostDetails = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  //const uri = location.pathname.split("/")[2];
  const { id } = useParams();
  //console.log(id);

  const post = useSelector((state) => state?.app?.post?.data);
  const posts = useSelector((state) => state?.app?.posts?.data);

  const isLoading = useSelector((state) => state?.app?.loading);
  //const { _id } = posts?.data.filter((data) => uri === data._id)[0];

  useEffect(() => {
    dispatch(fetchPostsById({ id }));
  }, [id, dispatch]);

  useEffect(() => {
    if (post)
      dispatch(
        fetchPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
  }, [post, dispatch]);

  //console.log(posts);
  const recommendedPosts = posts?.filter((data) => data?._id !== post?._id);

  //const recommendedPosts = 1;

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return !post ? (
    <CircularProgress></CircularProgress>
  ) : (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post?.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post?.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post?.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post?.createdAt).fromNow()}
          </Typography>
          {/* <Divider style={{ margin: "20px 0" }} /> */}
          {/* <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} /> */}
          {/* <CommentSection post={post} /> */}
          {/* <Divider style={{ margin: "20px 0" }} /> */}
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post?.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post?.title}
          />
        </div>
      </div>
      {recommendedPosts && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({ title, name, message, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => navigate(`/posts/${_id}`)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <img
                    src={selectedFile}
                    alt="https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                    width="200px"
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
