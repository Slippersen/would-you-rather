import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    loggedInUser: null,
    availableUsers: [],
  },
  reducers: {
    getAvailableUsers: (state, action) => {
      state.availableUsers = Object.keys(action.payload).map(
        (i) => action.payload[i]
      );
    },
    logIn: (state, action) => {
      // TODO: receive ID, map to available users
      state.loggedInUser = action.payload;
    },
    logOut: (state) => {
      state.loggedInUser = null;
    },
  },
});

export const { getAvailableUsers, logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
