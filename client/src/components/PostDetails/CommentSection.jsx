import React, { useState, useRef } from "react";
import useStyles from "./PostDetailsStyles.js";
import { Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../features/api/index.js";

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const commentsRef = useRef();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  //console.log(post.comments);
  const comments = useSelector((state) => state?.app?.comments);
  const [comment, setComment] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(
      addComment({
        commentDetails: `${user?.userName || user?.result?.name}:${comment}`,
        postId: post?._id,
      })
    );

    setComment("");
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
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
                  xs: "0.7rem", // Smaller text size for extra-small screens
                  sm: "0.7rem", // Slightly larger text size for small screens
                  md: "0.875rem", // Default text size for medium screens and up
                  lg: "0.875rem",
                },
                display: "insetInline",
              }}
            >
              <strong>{`${comment.split(":")[0]}:`}</strong>
              {comment.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
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
