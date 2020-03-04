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
import {basicRoutes as routes} from "../../Routes/routes";
import "./index.scss";
import matchRoute from "../../Routes/matchRoute";
import _404 from "../../pages/_404";

export default function BasicLayout(props) {
  const {location} = props;
  const match = matchRoute(routes, location);

  if (!match) {
    return <Route component={_404} />;
  }
  const {layout} = match;
  if (layout) {
    return <Route component={layout} />;
  }
  const {title, showTopBar} = match;
  return (
    <div className={classnames("basicLayout", "layout")}>
      {showTopBar && <TopBar title={title} />}
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
      <BottomNav menu={routes} />
    </div>
  );
}
