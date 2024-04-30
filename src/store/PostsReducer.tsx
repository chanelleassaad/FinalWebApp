import { createSlice } from "@reduxjs/toolkit";
import { IRoot } from "../data/RootInterface";

export interface IPostsState {
  posts: IRoot[];
  loading: boolean;
  error: string | null;
}

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPostsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    getPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getPostsStart, getPostsSuccess, getPostsFailure } =
  postsSlice.actions;

export default postsSlice.reducer;
