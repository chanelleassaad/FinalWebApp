import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  isLoading: boolean;
  isSignout: boolean;
  userToken: { refreshToken: string; accessToken: string } | null;
}

const initialState: IAuthState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    restoreToken(state, action) {
      state.isLoading = false;
      state.userToken = action.payload;
    },
    signIn(state, action) {
      state.isSignout = false;
      state.userToken = action.payload;
    },
    signOut(state) {
      state.isSignout = true;
      state.userToken = null;
    },
    updateAccessToken(state, action) {
      if (state.userToken) {
        state.userToken.accessToken = action.payload;
      }
    },
  },
});

export const { restoreToken, signIn, signOut, updateAccessToken } =
  authSlice.actions;

export default authSlice.reducer;
