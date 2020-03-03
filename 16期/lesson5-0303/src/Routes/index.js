import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from "../pages/HomePage/";
import LoginPage from "../pages/LoginPage/";
import UserPage from "../pages/UserPage/";
import TopBar from "../components/TopBar/";
import BottomNav from "../components/BottomNav/";
import BasicLayout from "../layout/BasicLayout/";
import PrivateRoute from "./PrivateRoute";

// const routes = [{
//   path: '',component: ''
// }]

// todo 实现topBar的顶部title显示，注意优化，不要重复渲染
export default function Routes(props) {
  return (
    <Router>
      {/* 能获取到history location match吗，来自context */}
      {/* <BottomNav /> */}

      {/* <Route component={TopBar} />
      <Route component={BottomNav} /> */}

      <Route component={BasicLayout}>
        <Route component={TopBar} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          {/* <Route path="/user" component={UserPage} /> */}
          {/* <PrivateRoute path="/user" component={UserPage} /> */}
          <PrivateRoute path="/user">
            <UserPage />
          </PrivateRoute>
        </Switch>
        <Route component={BottomNav} />
      </Route>

      {/* <Route exact path="/" component={HomePage} /> */}
      {/* <Route path="/login" component={LoginPage} />
        <Route path="/user" component={UserPage} /> */}
    </Router>
  );
}
