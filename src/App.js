import React, { useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { setAvailableUsersAsync, logOut } from "./app/usersSlice";
import { setQuestionsAsync } from "./app/questionsSlice";
import UsersList from "./components/UsersList";
import QuestionsList from "./components/QuestionsList";
import Leaderboard from "./components/Leaderboard";
import Question from "./components/Question";
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

const StyledAppName = styled.span`
  display: flex;
  margin-left: 24px;
`;

const StyledMenu = styled.span`
  align-content: center;
  margin-left: 24px;
`;

const StyledUsername = styled.span`
  position: absolute;
  top: 24px;
  right: 24px;
  font-size: 12px;
`;

const StyledLogoutLink = styled.span`
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const StyledMenuItem = styled.span`
  padding: 0 8px;
  font-size: 16px;
`;

const logOutUser = (dispatch) => {
  dispatch(logOut());
  window.location.href = "/";
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
        <StyledAppName>would-you-rather</StyledAppName>
        <StyledMenu>
          <Link to="/">
            <StyledMenuItem>Home</StyledMenuItem>
          </Link>
          <Link to="/add">
            <StyledMenuItem>New question</StyledMenuItem>
          </Link>
          <Link to="/leaderboard">
            <StyledMenuItem>Leaderboard</StyledMenuItem>
          </Link>
        </StyledMenu>
        {loggedInUser && (
          <StyledUsername>
            {loggedInUser.name}
            <br />
            <StyledLogoutLink onClick={() => logOutUser(dispatch)}>
              (log out)
            </StyledLogoutLink>
          </StyledUsername>
        )}
      </StyledHeader>
      <Switch>
        <Route
          exact
          path="/"
          component={!loggedInUser ? UsersList : QuestionsList}
        />
        <Route
          path="/leaderboard"
          component={!loggedInUser ? UsersList : Leaderboard}
        />
        <Route
          path="/questions/:qid"
          component={!loggedInUser ? UsersList : Question}
        />
        <Route
          render={() => (
            <>
              <p>There's nothing here.</p>
              <Link to="/">Go home</Link>
            </>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
