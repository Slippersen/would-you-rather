import { createSlice } from "@reduxjs/toolkit";
import * as DATA from "../../services/_DATA";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    loggedInUser: null,
    availableUsers: [],
  },
  reducers: {
    setAvailableUsers: (state, action) => {
      state.availableUsers = Object.keys(action.payload).map(
        (i) => action.payload[i]
      );
    },
    logIn: (state, action) => {
      // TODO: persist state upon refresh
      state.loggedInUser = action.payload;
    },
    logOut: (state) => {
      state.loggedInUser = null;
    },
  },
});

export const { setAvailableUsers, logIn, logOut } = userSlice.actions;

export const setAvailableUsersAsync = () => (dispatch) => {
  DATA._getUsers()
    .then((data) => dispatch(setAvailableUsers(data)))
    .catch((error) => console.log(error));
};

export default userSlice.reducer;
