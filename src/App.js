import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { setAvailableUsersAsync, logOut } from "./features/users/usersSlice";
import UsersList from "./components/UsersList";
import "./App.css";

const StyledHeader = styled.header`
  position: absolute;
  top: 0;
  width: 100%;
  background-color: #FEFEFE;
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
      {!loggedInUser ? <UsersList /> : <h1>Logged in</h1>}
    </div>
  );
};

export default App;
