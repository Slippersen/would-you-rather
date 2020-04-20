import { createSlice } from "@reduxjs/toolkit";
import * as DATA from "../services/_DATA";
import { setAvailableUsersAsync } from "./usersSlice";

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
    }
  },
});

export const {
  setQuestions,
  askQuestion,
  answerQuestion,
} = questionsSlice.actions;

export const setQuestionsAsync = () => (dispatch) => {
  DATA._getQuestions()
    .then((data) => dispatch(setQuestions(data)))
    .catch((error) => console.log(error));
};

export const askQuestionAsync = (question) => (dispatch) => {
  // question = {
  //    optionOneText,
  //    optionTwoText,
  //    author
  // }
  DATA._saveQuestion(question)
    .then((data) => dispatch(askQuestion(data)))
    .catch((error) => console.log(error));
};

export const answerQuestionAsync = (authedUser, qid, answer) => (dispatch) => {
  DATA._saveQuestionAnswer(authedUser, qid, answer)
    .then(() => {
      dispatch(setQuestionsAsync());
      dispatch(setAvailableUsersAsync());
    })
    .catch((error) => console.log(error));
};

export default questionsSlice.reducer;
