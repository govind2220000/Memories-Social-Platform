import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/posts"; //"http://localhost:5000/posts";

//readAction API
export const fetchPosts = createAsyncThunk(
  "fetchPosts",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(url);
      //console.log("From fetch post async thunk", data);
      //const result = await response.json();
      return data;
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
