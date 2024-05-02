import { configureStore } from "@reduxjs/toolkit";
import PostsReducer from "./PostsReducer";
import AuthReducer from "./authentication/AuthReducer";

const store = configureStore({
  reducer: {
    posts: PostsReducer,
    auth: AuthReducer,
  },
});

export default store;
