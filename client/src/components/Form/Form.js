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
  const user = JSON.parse(localStorage.getItem("profile"));
  //console.log(post);
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      console.log(currentId, postData);
      dispatch(
        updatePost({
          id: currentId,
          payload: { ...postData, name: user?.userName || user?.result?.name },
        })
      );

      setPostData({
        creator: "",
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
      });
      setKey(Date.now()); // Reset the key to current timestamp this for selected file issue
    } else {
      dispatch(
        createPost({ ...postData, name: user?.userName || user?.result?.name })
      );
      setPostData({
        creator: "",
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
      });
      setKey(Date.now()); // Reset the key to current timestamp
    }
    setCurrentId(null); //for clearing the form once the form is submitted
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  // if (!user) {
  //   <Paper>
  //     <Typography variant="h6" align="center">
  //       Please sign in create your own memories and like other's memories
  //     </Typography>
  //   </Paper>;
  // }
  return (
    <Paper sx={{ padding: "2px" }}>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          margin: {
            xs: "auto", // Center the form on extra-small screens
            sm: "2px", // Default margin on small screens and up
          },
          padding: {
            xs: "5px", // Center the form on extra-small screens
            sm: "2px", // Default margin on small screens and up
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          {currentId ? "Editing" : "Creating"} a memory
        </Typography>

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
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
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
