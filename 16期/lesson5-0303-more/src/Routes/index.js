import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import BasicLayout from "../layout/BasicLayout/";

// todo 实现topBar的顶部title显示，注意优化，不要重复渲染
export default function Routes(props) {
  return (
    <Router>
      <Route component={BasicLayout}></Route>
    </Router>
  );
}
