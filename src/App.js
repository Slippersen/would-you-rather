import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAvailableUsers, logIn, logOut } from "./features/users/usersSlice";
import * as DATA from "./services/_DATA";
import UsersList from "./components/UsersList";
import "./App.css";

const App = () => {
  const loggedInUser = useSelector((state) => state.users.loggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    DATA._getUsers().then((data) => dispatch(getAvailableUsers(data)));
  }, [dispatch]);

  // if (loggedInUser == null) {
  //   return <h1>LOG IN</h1>;
  // }

  return (
    <div className="App">
      <header className="App-header"></header>
      <UsersList />
    </div>
  );
};

export default App;
