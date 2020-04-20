import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import usersReducer from "./usersSlice";
import questionsReducer from './questionsSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    questions: questionsReducer
  },
});
