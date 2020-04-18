import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { logIn } from "../features/users/usersSlice";
import loadingGif from "../loading.gif";

const UsersListContainer = styled.div`
  background-color: #FAFAFA;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 24px 48px;
`;

const StyledHeader = styled.p`
  font-weight: bold;
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

const logInUser = (dispatch, user) => {
  dispatch(logIn(user));
};

const UsersList = () => {
  const availableUsers = useSelector((state) => state.users.availableUsers);
  const dispatch = useDispatch();

  if (availableUsers.length === 0) {
    return <StyledLoadingGif src={loadingGif} alt="Loading animation" />;
  }

  return (
    <UsersListContainer>
      <StyledHeader>Select your user:</StyledHeader>
      <ol>
        {availableUsers?.map((user) => (
          <StyledListEntry
            key={user.id}
            onClick={() => logInUser(dispatch, user)}
          >
            {user.name}
          </StyledListEntry>
        ))}
      </ol>
    </UsersListContainer>
  );
};

export default UsersList;
