import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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

  :hover {
    cursor: pointer;
    background-color: #fefefe;
  }
`;

const askQuestion = (dispatch, question) => {
  dispatch(askQuestionAsync(question));
};

const NewQuestion = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.users.loggedInUser);
  const questions = useSelector((state) => state.questions.questions);

//   const [question, setQuestion] = useState(null);
//   const [isAnswered, setIsAnswered] = useState(false);

//   useEffect(() => {
//     if (loggedInUser && questions) {
//       setIsAnswered(
//         question.optionOne.votes.includes(loggedInUser.id) ||
//           question.optionTwo.votes.includes(loggedInUser.id)
//       );
//     }
//   }, [loggedInUser, questions]);

  return (
    <QuestionContainer>
      <StyledHeader>New question</StyledHeader>
      {/* <>
          <StyledOption>
            {question.optionOne.text}
          </StyledOption>
          <StyledOption>
            {question.optionTwo.text}
          </StyledOption>
          <br />
        </> */}
    </QuestionContainer>
  );
};

export default NewQuestion;
