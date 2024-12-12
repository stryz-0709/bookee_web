import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: !!localStorage.getItem("jwt"),
    user: null,
  },
  reducers: {
    login(state, action) {
      const { jwt, user } = action.payload;
      state.isLoggedIn = true;
      state.user = user;
      localStorage.setItem("jwt", jwt);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("jwt");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;