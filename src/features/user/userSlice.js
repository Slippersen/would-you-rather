import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUser: null,
    // TODO: populate available users
    availableUsers: null
  },
  reducers: {
    logIn: (state, action) => {
      // TODO: receive ID, map to available users
      state.loggedInUser = action.payload;
    },
    logOut: state => {
      state.loggedInUser = null;
    }
  }
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
