import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { logIn } from "../features/users/usersSlice";
import loadingGif from "../loading.gif";

const StyledList = styled.ul`
  list-style: none;
`;

const StyledListEntry = styled.li`
  cursor: pointer;
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
    <StyledList>
      {availableUsers?.map((user) => (
        <StyledListEntry key={user.id} onClick={() => logInUser(dispatch, user)}>{user.name}</StyledListEntry>
      ))}
    </StyledList>
  );
};

export default UsersList;
