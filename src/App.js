import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import { getAvailableUsers, logIn, logOut } from "./features/users/usersSlice";
import * as DATA from "./services/_DATA";
import "./App.css";

const App = () => {
  const loggedInUser = useSelector(state => state.users.loggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    DATA._getUsers().then(data => dispatch(getAvailableUsers(data)));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
      </header>
    </div>
  );
};

export default App;
