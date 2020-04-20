import { createSlice } from "@reduxjs/toolkit";
import * as DATA from "../services/_DATA";

export const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
  },
  reducers: {
    setQuestions: (state, action) => {
      state.questions = Object.keys(action.payload).map(
        (i) => action.payload[i]
      );
    },
    askQuestion: (state, action) => {
      state.questions = state.questions.concat([action.payload]);
    },
    answerQuestion: (state, action) => {
      // TODO
    }
  },
});

export const { setQuestions, askQuestion, answerQuestion } = questionsSlice.actions;

export const setQuestionsAsync = () => (dispatch) => {
  DATA._getQuestions()
    .then((data) => dispatch(setQuestions(data)))
    .catch((error) => console.log(error));
};

export default questionsSlice.reducer;
