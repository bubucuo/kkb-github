import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import UserPage from "./UserPage";

export default function RouteRenderPage(props) {
  return (
    <div>
      <h3>RouterRenderPage</h3>
      <Router>
        <FadingRoute path="/cool" component={UserPage} />
      </Router>
    </div>
  );
}

// wrapping/composing
//把route参数传递给你的组件
function FadingRoute({component: Component, ...rest}) {
  return (
    <Route {...rest} render={routeProps => <Component {...routeProps} />} />
  );
}
