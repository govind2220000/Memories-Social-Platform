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
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";

const Post = ({ post, setCurrentId }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "15px",
        height: "100%",
        position: "relative",
      }}
    >
      <CardMedia
        image={post.selectedFile}
        title={post.title}
        sx={{
          height: 0,
          paddingTop: "56.25%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backgroundBlendMode: "darken",
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
          {post.creator}
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
          {post.tags.map((tag) => `#${tag} `)}
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
            {post.message}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            padding: "0 16px 8px 16px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button size="small" color="primary" onClick={() => {}}>
            <ThumbUpAltIcon fontSize="small"></ThumbUpAltIcon>
            Like
            {post.likeCount}
          </Button>
          <Button size="small" color="primary" onClick={() => {}}>
            <DeleteIcon fontSize="small"></DeleteIcon>
            Delete
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};

export default Post;
