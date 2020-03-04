import React from "react";
import classnames from "classnames";
import {Route, Switch} from "react-router-dom";
import TopBar from "../../components/TopBar/";
import BottomNav from "../../components/BottomNav/";
import {basicRoutes as routes} from "../../Routes/routes";
import "./index.scss";
import {matchAllRoute, matchRoute} from "../../Routes/matchRoute";
import _404 from "../../pages/_404";

export default function BasicLayout(props) {
  console.log("asas", props); //sy-log
  const {location} = props;
  const matchAll = matchAllRoute(location);

  // 所有都不匹配，404
  if (!matchAll) {
    return <Route component={_404} />;
  }

  const match = matchRoute(routes, location);

  const {layout, component} = matchAll;

  // 不匹配当前
  if (!match) {
    return layout ? (
      <Route component={layout} />
    ) : (
      <Route component={component} />
    );
  }
  if (!match && component) {
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
