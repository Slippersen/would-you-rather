import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { answerQuestionAsync } from "../app/questionsSlice";

const QuestionContainer = styled.div`
  background-color: #fafafa;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 24px 48px;
  margin: 24px;
`;

const StyledHeader = styled.p`
  font-weight: bold;
`;

const answerQuestion = (dispatch, loggedInUser, questionId, answer) => {
  dispatch(answerQuestionAsync(loggedInUser, questionId, answer));
};

const Question = ({ question }) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.users.loggedInUser);
  // example question:
  //   "6ni6ok3ym7mf1p33lnez": {
  //     id: '6ni6ok3ym7mf1p33lnez',
  //     author: 'johndoe',
  //     timestamp: 1468479767190,
  //     optionOne: {
  //       votes: [],
  //       text: 'become a superhero',
  //     },
  //     optionTwo: {
  //       votes: ['johndoe', 'sarahedo'],
  //       text: 'become a supervillain'
  //     }
  //   },
  return (
    question && (
      <QuestionContainer>
        <StyledHeader>Would you rather ...</StyledHeader>
        <p
          onClick={() =>
            answerQuestion(
              dispatch,
              loggedInUser,
              question.id,
              question.optionOne.text
            )
          }
        >
          {question.optionOne.text}
        </p>
        <p
          onClick={() =>
            answerQuestion(
              dispatch,
              loggedInUser,
              question.id,
              question.optionTwo.text
            )
          }
        >
          {question.optionTwo.text}
        </p>
      </QuestionContainer>
    )
  );
};

export default Question;
