import React, { useEffect, useState } from "react";
import { TextField, Paper, Typography, Button } from "@mui/material";
import FileBase64 from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../features/api/index.js";

const Form = ({ currentId, setCurrentId }) => {
  // const posts = useSelector((state) => state.app.posts);
  // console.log(posts);
  const [key, setKey] = useState(Date.now());
  const post = useSelector((state) =>
    currentId ? state.app.posts.find((p) => p._id === currentId) : null
  );
  //console.log(post);
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      console.log(currentId, postData);
      dispatch(updatePost({ id: currentId, payload: postData }));

      setPostData({
        creator: "",
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
      });
      setKey(Date.now()); // Reset the key to current timestamp this for selected file issue
      setCurrentId(null);
    } else {
      dispatch(createPost(postData));
      setPostData({
        creator: "",
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
      });
      setKey(Date.now()); // Reset the key to current timestamp
      setCurrentId(null);
    }
  };
  const clear = () =>
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  return (
    <Paper sx={{ padding: "5px" }}>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography
          variant="h6"
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          Creating a memory
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          sx={{ margin: "5px 0px" }}
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        ></TextField>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          sx={{ margin: "5px 0px" }}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        ></TextField>
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          sx={{ margin: "5px 0px" }}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        ></TextField>
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          sx={{ margin: "8px 0px" }}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        ></TextField>
        <div>
          <FileBase64
            key={key} //here the key is used as we selected the file and after submitting also the same file was shown as selected to over come that we have used this key as an state variable which updates every time we create or edit post such that this FileBase64 compoennt refreshes
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          ></FileBase64>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            sx={{ margin: "8px 0" }}
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default Form;
