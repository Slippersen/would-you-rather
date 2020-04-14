import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import loadingGif from "../loading.gif";

const StyledList = styled.ul`
  list-style: none;
`;

const StyledLoadingGif = styled.img`
  height: 128px;
`;

const UsersList = () => {
  const availableUsers = useSelector((state) => state.users.availableUsers);

  if (availableUsers.length === 0) {
    return <StyledLoadingGif src={loadingGif} alt="Loading animation" />;
  }

  return (
    <StyledList>
      {availableUsers?.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </StyledList>
  );
};

export default UsersList;
