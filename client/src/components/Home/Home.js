import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  Grid,
  Grow,
  Paper,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Posts from "../Posts/Posts.js";
import Form from "../Form/Form.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchPostsBySearch } from "../../features/api/index.js";
import { alreadysignedInUser } from "../../features/slices/posts.js";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Paginate from "../Pagination.jsx";
import ChipInput from "material-ui-chip-input";

const Home = () => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  // const isTablet = useMediaQuery(theme.breakpoints.down("sm"));
  const isLoading = useSelector((state) => state?.app?.loading);
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  // const user = useSelector((state) => state.app.user[0]);
  //console.log(page);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      //dispatch action for fetching post
      dispatch(fetchPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );

      setSearch("");
      setTags([]);
    } else {
      <Navigate to="/"></Navigate>;
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  // const handleScreen = () => {
  //   if (isMobile || isTablet) {
  //     ("column-reverse");
  //   } else {
  //     ("row");
  //   }
  // };

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));
  // useEffect(() => {
  //   dispatch(fetchPosts()); //for the very first time it will do the api call and will get all the post but after whenever we perform any action we are directly updating out store and hence our data layer gets updated everytime hence we dont have to pass any dependency in the array to make this callbback run again and again and it works as expected. We have put dispatch since we were receiving warning. But for ideal case we should pass dependencies to get the most updated data
  //   // dispatch(alreadysignedInUser()); //checks if the user was already logged in or not
  // }, [dispatch, currentId]);
  //console.log(page, isLoading);
  // if (!isLoading) {
  //   return (
  //     <Paper
  //       elevation={6}
  //       sx={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         padding: "20px",
  //         borderRadius: "15px",
  //         height: "39vh",
  //       }}
  //     >
  //       <CircularProgress size="7em" />
  //     </Paper>
  //   );
  // }

  return (
    <Grow in style={{ maxWidth: "100%", width: "100%" }} className="ABC">
      <Container style={{ marginTop: "20px" }}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          width="fullWidth"
          sx={{
            flexDirection: {
              xs: "column",
              md: "column",
              lg: "row",
            },
          }}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId}></Posts>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={3}
            sx={{
              width: "100%",
            }}
          >
            <AppBar
              position="static"
              color="inherit"
              elevation={6}
              sx={{
                borderRadius: 4,
                marginBottom: "0.5rem",
                display: "flex",
                padding: "16px",
                width: "fullWidth",
              }}
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onKeyDown={handleKeyPress}
                onChange={(e) => setSearch(e.target.value)}
              ></TextField>
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} variant="contained" color="primary">
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
            <Paper elevation={6} className="ABC1234">
              <Paginate page={page}></Paginate>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
