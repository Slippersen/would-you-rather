import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { logIn } from "../app/usersSlice";
import loadingGif from "../img/loading.gif";

const UsersListContainer = styled.div`
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
  vertical-align: middle;
  margin-top: 32px;
  margin-bottom: 16px;

  :hover {
    text-decoration: underline;
  }
`;

const StyledAvatar = styled.img`
  height: 48px;
`;

const StyledUserName = styled.b`
  position: relative;
  left: 8px;
  bottom: 20px;
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
      <StyledList>
        {availableUsers?.map((user) => (
          <StyledListEntry
            key={user.id}
            onClick={() => logInUser(dispatch, user)}
          >
            <StyledAvatar src={user.avatarURL} alt={user.name}/>
            <StyledUserName>{user.name}</StyledUserName>
          </StyledListEntry>
        ))}
      </StyledList>
    </UsersListContainer>
  );
};

export default UsersList;
