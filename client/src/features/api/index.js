import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/posts"; //"http://localhost:5000/posts";
const authUrl = "http://localhost:5000/users"; //http://localhost:5000/users";

//For passing jwt token on every request
axios.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
//readAction API
export const fetchPostsBySearch = createAsyncThunk(
  "fetchPostsBySearch",
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await axios.post(
        `${url}/search?searchQuery=${payload.search || "none"}&tags=${
          payload.tags
        }`
      );
      console.log(data);

      //console.log("From fetch post async thunk", data);
      //const result = await response.json();
      return { data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const fetchPosts = createAsyncThunk(
  "fetchPosts",
  async ({ page }, { rejectWithValue }) => {
    //console.log(page);
    try {
      const { data } = await axios.get(`${url}?page=${page}`);
      console.log("From fetch post async thunk", {
        data,
      });
      //const result = await response.json();
      return {
        data: data.data,
        currentPage: data.currentPage,
        numberOfPage: data.numberOfPage,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//createAction API
export const createPost = createAsyncThunk(
  "createPost",
  async (payload, { rejectWithValue }) => {
    //console.log("From create post async thunk", payload);
    try {
      const { data } = await axios.post(url, payload);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//updateAction API
export const updatePost = createAsyncThunk(
  "updatePost",
  async ({ id, payload }, { rejectWithValue }) => {
    console.log("From update post async thunk", id, payload);
    try {
      const { data } = await axios.patch(`${url}/${id}`, payload);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//Delete Action

export const deletePost = createAsyncThunk(
  "deletePost",
  async (id, { rejectWithValue }) => {
    console.log("From delete post async thunk", id);
    try {
      const { data } = await axios.delete(`${url}/${id}`);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//Like Action

export const likePost = createAsyncThunk(
  "likePost",
  async (id, { rejectWithValue }) => {
    console.log("From like post async thunk", id);
    try {
      const { data } = await axios.patch(`${url}/${id}/likePost`);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//Auth actions

export const signInUser = createAsyncThunk(
  "signInUser",
  async ({ formData, navigate, setUser }, { rejectWithValue }) => {
    console.log(formData, navigate);
    try {
      //login the user
      //console.log(formData, navigate);
      const { data } = await axios.post(`${authUrl}/signin`, formData);
      console.log(data);

      localStorage.setItem("profile", JSON.stringify({ ...data }));
      setUser(JSON.parse(localStorage.getItem("profile")));
      navigate("/");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const signUpUser = createAsyncThunk(
  "signUpUser",
  async ({ formData, navigate, setUser }, { rejectWithValue }) => {
    console.log(formData, navigate);
    try {
      //signUp the user
      const { data } = await axios.post(`${authUrl}/signup`, formData);
      console.log(data);

      localStorage.setItem("profile", JSON.stringify({ ...data }));
      setUser(JSON.parse(localStorage.getItem("profile")));

      navigate("/");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
