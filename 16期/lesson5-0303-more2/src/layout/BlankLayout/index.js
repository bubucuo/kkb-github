import React, {Component} from "react";
import classnames from "classnames";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation
} from "react-router-dom";

import TopBar from "../../components/TopBar/";
import BottomNav from "../../components/BottomNav/";
import {blankRoutes as routes} from "../../Routes/routes";
import matchRoute from "../../Routes/matchRoute";

export default function BlankLayout(props) {
  const {location} = props;
  const match = matchRoute(routes, location);
  // if (!match) {
  //   return null;
  // }
  return (
    <div className={classnames("blankLayout")}>
      <Switch>
        {routes.map(item => {
          return item.guard ? (
            <item.guard
              key={item.path}
              path={item.path}
              component={item.component}
              {...item.props}
            />
          ) : (
            <Route
              key={item.path}
              path={item.path}
              component={item.component}
              {...item.props}
            />
          );
        })}
      </Switch>
    </div>
  );
}
