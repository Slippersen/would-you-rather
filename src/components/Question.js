import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import loadingGif from "../img/loading.gif";
import { answerQuestionAsync } from "../app/questionsSlice";

const QuestionContainer = styled.div`
  background-color: #fafafa;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 24px 48px;
  padding-bottom: 48px;
  margin: 24px;
`;

const StyledHeader = styled.p`
  font-weight: bold;
  padding-bottom: 24px;
`;

const StyledLoadingGif = styled.img`
  height: 128px;
`;

const StyledOption = styled.span`
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 16px;
  margin: 16px;  

  :hover {
    cursor: pointer;
    background-color: #fefefe;
  }
`;

const answerQuestion = (dispatch, loggedInUser, questionId, answer) => {
  
  // TODO

  dispatch(answerQuestionAsync(loggedInUser, questionId, answer));
};

const Question = ({ match }) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.users.loggedInUser);
  const questions = useSelector((state) => state.questions.questions);

  const [question, setQuestion] = useState(null);

  useEffect(() => {
    if (match.params.qid && questions) {
      setQuestion(
        questions.filter((question) => question.id === match.params.qid)[0]
      );
    }
  }, [match.params.qid, questions]);

  if (question == null) {
    return <StyledLoadingGif src={loadingGif} alt="Loading animation" />;
  }

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
        <StyledOption
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
        </StyledOption>
        <StyledOption
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
        </StyledOption>
        <br />
      </QuestionContainer>
    )
  );
};

export default Question;
