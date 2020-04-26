import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import loadingGif from "../img/loading.gif";

const QuestionsListContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #fafafa;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 24px 48px;
  margin: 24px;
`;

const QuestionsCategoryContainer = styled.div`
  display: inline-block;
  max-width: 40%;
  margin: 0 5%;
`;

const StyledHeader = styled.p`
  font-weight: bold;
`;

const StyledList = styled.ul`
  /* list-style: none; */
  /* padding: 0; */
`;

const StyledListEntry = styled.li`
  cursor: pointer;
  text-align: left;

  :hover {
    text-decoration: underline;
  }
`;

const StyledLoadingGif = styled.img`
  height: 128px;
`;

const QuestionsList = () => {
  const loggedInUser = useSelector((state) => state.users.loggedInUser);
  const questions = useSelector((state) => state.questions.questions);

  if (questions.length === 0) {
    return <StyledLoadingGif src={loadingGif} alt="Loading animation" />;
  }

  return (
    <QuestionsListContainer>
      <QuestionsCategoryContainer>
        <StyledHeader>Unanswered questions</StyledHeader>
        <StyledList>
          {questions?.map(
            (question) =>
              !question.optionOne.votes.includes(loggedInUser.id) &&
              !question.optionTwo.votes.includes(loggedInUser.id) && (
                <StyledListEntry key={question.id}>
                  <Link to={`/questions/${question.id}`}>
                    {question.optionOne.text} or {question.optionTwo.text} (
                    {question.author})
                  </Link>
                </StyledListEntry>
              )
          )}
        </StyledList>
      </QuestionsCategoryContainer>
      <QuestionsCategoryContainer>
        <StyledHeader>Answered questions</StyledHeader>
        <StyledList>
          {questions?.map(
            (question) =>
              (question.optionOne.votes.includes(loggedInUser.id) ||
                question.optionTwo.votes.includes(loggedInUser.id)) && (
                <StyledListEntry key={question.id}>
                  <Link to={`/questions/${question.id}`}>
                    {question.optionOne.text} or {question.optionTwo.text} (
                    {question.author})
                  </Link>
                </StyledListEntry>
              )
          )}
        </StyledList>
      </QuestionsCategoryContainer>
    </QuestionsListContainer>
  );
};

export default QuestionsList;
