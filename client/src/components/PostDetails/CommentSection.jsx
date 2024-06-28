import React, { useState } from "react";
import useStyles from "./PostDetailsStyles.js";
import { Button, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addComment } from "../../features/api/index.js";

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comments, setComments] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [comment, setComment] = useState("");
  const handleClick = () => {
    dispatch(
      addComment({
        commentDetails: `${user?.userName || user?.result?.name}:${comment}`,
        postId: post?._id,
      })
    );
  };
  return (
    <div className="">
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.map((comment, i) => (
            <Typography
              key={i}
              gutterBottom
              variant="subtitle1"
              sx={{
                fontSize: {
                  xs: "0.8rem", // Smaller text size for extra-small screens
                  sm: "1rem", // Slightly larger text size for small screens
                  md: "1.2rem", // Default text size for medium screens and up
                },
                display: "insetInline",
              }}
            >
              Comment {i}
            </Typography>
          ))}
        </div>
        <div style={{ width: "70%" }}>
          <Typography gutterBottom variant="h6">
            Write a Comment
          </Typography>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></TextField>
          <Button
            style={{ marginTop: "10px" }}
            fullWidth
            variant="contained"
            disabled={!comment}
            onClick={handleClick}
            color="primary"
          >
            Add Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
