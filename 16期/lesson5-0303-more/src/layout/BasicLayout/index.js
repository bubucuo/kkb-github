import React from "react";
import classnames from "classnames";
import {Route, Switch} from "react-router-dom";
import TopBar from "../../components/TopBar/";
import BottomNav from "../../components/BottomNav/";
import {basicRoutes as routes} from "../../Routes/routes";
import "./index.scss";
import {matchAllRoute, matchRoute} from "../../Routes/matchRoute";
import _404 from "../../pages/_404";
import BlankLayout from "../BlankLayout";

export default function BasicLayout(props) {
  const {location} = props;
  console.log("location", location); //sy-log
  // 404
  const matchAll = matchAllRoute(location);
  if (!matchAll) {
    return <Route component={_404} />;
  }
  //在路由表配置过路由，但是没有使用BasicLayout的框架的页面
  const match = matchRoute(routes, location);
  // const {lay}
  if (!match) {
    const {component} = matchAll;
    return <Route component={BlankLayout} />;
  }

  // 这个地方返回的应该是使用BasicLayout的页面
  const {title, showTopBar} = match;
  return (
    <div className={classnames("basicLayout", "layout")}>
      {showTopBar && <TopBar title={title} />}
      <article>
        <Switch>
          {routes.map(item =>
            item.guard ? (
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
            )
          )}
        </Switch>
      </article>
      <BottomNav menu={routes} />
    </div>
  );
}
