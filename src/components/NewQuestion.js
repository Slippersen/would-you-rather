import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { askQuestionAsync } from "../app/questionsSlice";

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

const StyledOption = styled.span`
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 16px;
  margin: 16px;
`;

const NewQuestion = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.users.loggedInUser);

  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [asked, setAsked] = useState(false);

  const askQuestion = () => {
    let author = loggedInUser.id;
    let question = {
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author,
    };
    dispatch(askQuestionAsync(question));
    setAsked(true);
  };

  useEffect(() => {}, [asked]);

  return asked ? (
    <QuestionContainer>
      <StyledHeader>Question saved</StyledHeader>
      <Link to="/">Return to question list</Link>
    </QuestionContainer>
  ) : (
    <QuestionContainer>
      <StyledHeader>New question (would you rather ...)</StyledHeader>
      <>
        <StyledOption>
          Option one: &nbsp;
          <input
            type="text"
            onChange={(event) => setOptionOne(event.target.value)}
          />
        </StyledOption>
        <StyledOption>
          Option two: &nbsp;
          <input
            type="text"
            onChange={(event) => setOptionTwo(event.target.value)}
          />
        </StyledOption>
        <br />
        <br />
        <br />
        <br />
        <button onClick={askQuestion}>Save</button>
      </>
    </QuestionContainer>
  );
};

export default NewQuestion;
