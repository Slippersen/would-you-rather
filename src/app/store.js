import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import usersReducer from "../features/user/usersSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer
  }
});
