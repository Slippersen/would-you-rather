import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { setAvailableUsersAsync, logOut } from "./app/usersSlice";
import { setQuestionsAsync } from "./app/questionsSlice";
import UsersList from "./components/UsersList";
import QuestionsList from "./components/QuestionsList";
import "./style/App.css";

const StyledHeader = styled.header`
  position: absolute;
  top: 0;
  width: 100%;
  background-color: #fefefe;
  border-bottom: 1px solid lightgray;
  padding: 24px 0;
  font-size: 1.5rem;
`;

const StyledUsername = styled.span`
  position: absolute;
  right: 24px;
  font-size: 12px;
`;

const StyledLogoutLink = styled.span`
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const logOutUser = (dispatch) => {
  dispatch(logOut());
};

const App = () => {
  const loggedInUser = useSelector((state) => state.users.loggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAvailableUsersAsync());
    dispatch(setQuestionsAsync());
  }, [dispatch]);

  return (
    <div className="App">
      <StyledHeader>
        would-you-rather
        {loggedInUser && (
          <StyledUsername>
            {loggedInUser?.name}
            <br />
            <StyledLogoutLink onClick={() => logOutUser(dispatch)}>
              (log out)
            </StyledLogoutLink>
          </StyledUsername>
        )}
      </StyledHeader>
      {!loggedInUser ? <UsersList /> : <QuestionsList />}
    </div>
  );
};

export default App;
