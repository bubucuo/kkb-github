import React from "react";

import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../pages/HomePage/";
import UserPage from "../pages/UserPage/";
import LoginPage from "../pages/LoginPage/";
import _404 from "../pages/_404/";

export default function Routes(props) {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        {/* <Route path="/user"  component={UserPage} /> */}
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/user">
          <UserPage />
        </PrivateRoute>
        <Route component={_404} />
      </Switch>
    </Router>
  );
}
