import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const StyledResult = styled.span`
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 16px;
  margin: 16px;
`;

const StyledLink = styled.p`
  margin-top: 48px;
  margin-bottom: 0;
`;

const answerQuestion = (dispatch, loggedInUserId, questionId, answer) => {
  dispatch(answerQuestionAsync(loggedInUserId, questionId, answer));
};

const Question = ({ match }) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.users.loggedInUser);
  const questions = useSelector((state) => state.questions.questions);

  const [question, setQuestion] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (match.params.qid && questions) {
      setQuestion(
        questions.filter((question) => question.id === match.params.qid)[0]
      );
    }
  }, [match.params.qid, questions]);

  useEffect(() => {
    if (loggedInUser && question) {
      setIsAnswered(
        question.optionOne.votes.includes(loggedInUser.id) ||
          question.optionTwo.votes.includes(loggedInUser.id)
      );
    }
  }, [loggedInUser, question]);

  if (question == null) {
    return <StyledLoadingGif src={loadingGif} alt="Loading animation" />;
  }

  return (
    question && (
      <QuestionContainer>
        <StyledHeader>
          {!isAnswered ? "Would you rather ..." : "Results"}
        </StyledHeader>
        {!isAnswered ? (
          <>
            <StyledOption
              onClick={() =>
                answerQuestion(
                  dispatch,
                  loggedInUser.id,
                  question.id,
                  "optionOne"
                )
              }
            >
              {question.optionOne.text}
            </StyledOption>
            <StyledOption
              onClick={() =>
                answerQuestion(
                  dispatch,
                  loggedInUser.id,
                  question.id,
                  "optionTwo"
                )
              }
            >
              {question.optionTwo.text}
            </StyledOption>
            <br />
          </>
        ) : (
          <>
            <StyledResult>
              {question.optionOne.text} ({question.optionOne.votes.length} votes
              {question.optionOne.votes.includes(loggedInUser.id) &&
                " - including yours"}
              )
            </StyledResult>
            <StyledResult>
              {question.optionTwo.text} ({question.optionTwo.votes.length} votes
              {question.optionTwo.votes.includes(loggedInUser.id) &&
                " - including yours"}
              )
            </StyledResult>
            <Link to="/">
              <StyledLink>Return to question list</StyledLink>
            </Link>
          </>
        )}
      </QuestionContainer>
    )
  );
};

export default Question;
