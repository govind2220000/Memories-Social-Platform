import { configureStore } from "@reduxjs/toolkit";

import postSlice from "../features/slices/posts.js";

export const store = configureStore({
  reducer: { app: postSlice },
});
