import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import loadingGif from "../img/loading.gif";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 24px 48px;
  margin: 24px;
`;

const StyledHeader = styled.p`
  font-weight: bold;
`;

const StyledList = styled.ol`
  display: block;
`;

const StyledListEntry = styled.li`
  text-align: left;
  margin-bottom: 8px;
`;

const StyledAvatar = styled.img`
  display: inline-block;
  height: 24px;
`;

const StyledLoadingGif = styled.img`
  height: 128px;
`;

const Leaderboard = () => {
  const users = useSelector((state) => state.users.availableUsers);
  const [orderedLeadersList, setOrderedLeadersList] = useState(null);

  useEffect(() => {
    if (users) {
      let orderedList = users
        .map((user) => {
          return {
            id: user.id,
            name: user.name,
            avatar: user.avatarURL,
            questionsAsked: user.questions.length,
            questionsAnswered: Object.keys(user.answers).length,
          };
        })
        .sort((a, b) =>
          a.questionsAsked + a.questionsAnswered >
          b.questionsAsked + b.questionsAnswered
            ? -1
            : 1
        );
      setOrderedLeadersList(orderedList);
    }
  }, [users]);

  if (orderedLeadersList == null) {
    return <StyledLoadingGif src={loadingGif} alt="Loading animation" />;
  }

  return (
    <Container>
      <StyledHeader>Leaderboard</StyledHeader>
      <StyledList>
        {orderedLeadersList &&
          orderedLeadersList.map((user) => (
            <StyledListEntry key={user.id}>
              <StyledAvatar src={user.avatar} alt="avatar" />
              <span>
                {user.id} ({user.questionsAsked} questions asked,{" "}
                {user.questionsAnswered} questions answered)&nbsp;
              </span>
            </StyledListEntry>
          ))}
      </StyledList>
    </Container>
  );
};

export default Leaderboard;
