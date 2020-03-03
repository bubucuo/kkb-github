import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import TopBar from "../components/TopBar/";
import BottomNav from "../components/BottomNav/";
import BasicLayout from "../layout/BasicLayout/";
import routes from "./routes";

// todo 实现topBar的顶部title显示，注意优化，不要重复渲染
export default function Routes(props) {
  return (
    <Router>
      {/* 能获取到history location match吗，来自context */}
      {/* <BottomNav /> */}
      <Route children={<TopBar routes={routes} />} />
      <Route component={BottomNav} />
      <Switch>
        {routes.map(item => {
          return item.guard ? (
            <item.guard
              {...item.props}
              path={item.path}
              key={item.path}
              component={item.component}
            />
          ) : (
            <Route
              {...item.props}
              path={item.path}
              key={item.path}
              component={item.component}
            />
          );
        })}
      </Switch>
    </Router>
  );
}
