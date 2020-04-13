import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    loggedInUser: null,
    availableUsers: null
  },
  reducers: {
    getAvailableUsers: (state, action) => {
      state.availableUsers = action.payload;
    },
    logIn: (state, action) => {
      // TODO: receive ID, map to available users
      state.loggedInUser = action.payload;
    },
    logOut: state => {
      state.loggedInUser = null;
    }
  }
});

export const { getAvailableUsers, logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
