import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  signInUser,
  signUpUser,
  fetchPostsBySearch,
  fetchPostsById,
  addComment,
} from "../api/index.js";

const initialState = {
  posts: [],
  post: [],
  loading: false,
  user: [],
  comments: [],
};

//readAction
// export const fetchPosts = createAsyncThunk(
//   "fetchPosts",
//   async (args, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         "https://6650c93f20f4f4c442761ccb.mockapi.io/crud"
//       );
//       const result = await response.json();
//       return result;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

export const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    googlesignInUser: (state, action) => {
      //console.log(action.payload);
      const userDetails = action?.payload;
      state.user[0] = userDetails;
      //console.log(state.user[0]);
      localStorage.setItem("profile", JSON.stringify({ ...userDetails }));
    },
    alreadysignedInUser: (state) => {
      const userDetails = JSON.parse(localStorage.getItem("profile"));
      state.user[0] = userDetails;
    },
    signOutUser: (state) => {
      localStorage.removeItem("profile");

      state.posts = [];
      state.loading = false;
      state.user = [];
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })

      .addCase(addComment.pending, (state) => {
        //state.loading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        //state.loading = false;
        //console.log(action.payload.data.comments);
        state.comments = action.payload.data.comments;
      })
      .addCase(addComment.rejected, (state, action) => {
        //state.loading = false;
        state.post = action.payload;
      })

      .addCase(fetchPostsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostsById.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.data.comments;
        //console.log(state.posts);
        state.post = action.payload;
      })
      .addCase(fetchPostsById.rejected, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })

      .addCase(fetchPostsBySearch.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchPostsBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPostsBySearch.rejected, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        //console.log(state, action.payload);
        state.posts.data.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        //console.log(state, action.payload);
        state.posts.data = state.posts.data.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })

      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        //console.log(state, action.payload);
        state.posts.data = state.posts.data.filter(
          (post) => post._id !== action.payload._id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })

      .addCase(likePost.pending, (state) => {
        //state.loading = true;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        //state.loading = false;
        //console.log(state, action.payload);
        state.posts.data = state.posts.data.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(likePost.rejected, (state, action) => {
        //state.loading = false;
        state.posts = action.payload;
      })

      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        //console.log(state, action.payload);
        const userDetails = action?.payload;
        state.user[0] = userDetails;
        console.log(state.user[0]);
        localStorage.setItem("profile", JSON.stringify({ ...userDetails }));
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.user[0] = action.payload;
      })

      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(state, action.payload);
        const userDetails = action?.payload;
        state.user[0] = userDetails;
        console.log(state.user[0]);
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.user[0] = action.payload;
      });
  },
});

//export const { searchUser } = postSlice.actions;

export default postSlice.reducer;
export const { googlesignInUser, alreadysignedInUser, signOutUser } =
  postSlice.actions;
