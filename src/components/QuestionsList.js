import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import loadingGif from "../img/loading.gif";

const QuestionsListContainer = styled.div`
  background-color: #fafafa;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 24px 48px;
`;

const StyledHeader = styled.p`
  font-weight: bold;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
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
  const questions = useSelector((state) => state.questions.questions);

  if (questions.length === 0) {
    return <StyledLoadingGif src={loadingGif} alt="Loading animation" />;
  }

  return (
    <QuestionsListContainer>
      <StyledHeader>Questions:</StyledHeader>
      <StyledList>
        {questions?.map((question) => (
          <StyledListEntry key={question.id}>{question.id}</StyledListEntry>
        ))}
      </StyledList>
    </QuestionsListContainer>
  );
};

export default QuestionsList;
