import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import HomePage from "./pages/HomePage";
import { getAvailableUsers, logIn, logOut } from "./features/user/usersSlice";
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
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
  );
};

export default App;
