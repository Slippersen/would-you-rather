import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAvailableUsers } from "./features/users/usersSlice";
import * as DATA from "./services/_DATA";
import UsersList from "./components/UsersList";
import "./App.css";

const App = () => {
  const loggedInUser = useSelector((state) => state.users.loggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    DATA._getUsers().then((data) => dispatch(setAvailableUsers(data)));
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header"></header>
      { !loggedInUser ? <UsersList /> : <h1>Logged in</h1> }
    </div>
  );
};

export default App;
