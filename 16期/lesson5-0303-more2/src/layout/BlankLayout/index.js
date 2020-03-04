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
import "./index.scss";

export default function BlankLayout(props) {
  return (
    <div className={classnames("blankLayout", "layout")}>
      <article>
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
      </article>
    </div>
  );
}
