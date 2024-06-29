import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../features/api/index.js";
import { useNavigate } from "react-router-dom";

const Post = ({ post, setCurrentId, currentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  //console.log(post, user);
  const Likes = () => {
    //console.log(post.likes.length, user?.result?._id);
    if (post?.likes?.length > 0) {
      return post.likes.find(
        (like) => like === (user?._id || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "15px",
        height: "100%",
        position: "relative",
        margin: "0px 10px",
      }}
      elevation={6}
    >
      <CardMedia
        onClick={() => {
          //setCurrentId(post._id);
          //console.log(post._id);
          navigate(`/posts/${post._id}`);
        }}
        image={post.selectedFile}
        title={post.title}
        sx={{
          height: 0,
          paddingTop: "56.25%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backgroundBlendMode: "darken",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      />
      <div>
        <Typography
          variant="h5"
          sx={{
            position: "absolute",
            top: "20px",
            left: "20px",
            color: "white",
          }}
        >
          {post.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            position: "absolute",
            top: "50px",
            left: "22px",
            color: "white",
          }}
        >
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div>
        {(user?._id === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            style={{ color: "white" }}
            sx={{
              position: "absolute",
              top: "20px",
              right: "20px",
              color: "white",
            }}
            size="small"
            onClick={() => {
              setCurrentId(post._id);
              console.log(post._id);
            }}
          >
            <MoreHorizIcon fontSize="medium"></MoreHorizIcon>
          </Button>
        )}
      </div>
      <div>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px",
          }}
        >
          {post?.tags?.map((tag) => `#${tag} `)}
        </Typography>
        <Typography
          sx={{
            padding: "0 16px",
          }}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message.length > 100
              ? `${post.message.substring(0, 100)}...`
              : post.message}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            padding: "0 16px 8px 16px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(likePost(post._id))}
          >
            <Likes />
          </Button>
          {/* {console.log(user, post)} */}
          {(user?._id === post?.creator ||
            user?.result?._id === post?.creator) && (
            <Button
              size="small"
              color="primary"
              onClick={() => dispatch(deletePost(post._id))}
            >
              <DeleteIcon fontSize="small"></DeleteIcon>
              Delete
            </Button>
          )}
        </CardActions>
      </div>
    </Card>
  );
};

export default Post;
