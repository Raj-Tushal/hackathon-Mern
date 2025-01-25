import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    userData: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Login reducers
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.userData = action.payload;
      state.error = null;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.userData = null;
      state.error = action.payload;
    },

    // Signup reducers
    signupStart(state) {
      state.loading = true;
      state.error = null;
    },
    signupSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.userData = action.payload;
      state.error = null;
    },
    signupFailure(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.userData = null;
      state.error = action.payload;
    },

    // Logout reducer
    logout(state) {
      state.isAuthenticated = false;
      state.userData = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
