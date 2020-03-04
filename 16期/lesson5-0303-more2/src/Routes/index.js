import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import BasicLayout from "../layout/BasicLayout/";
import BlankLayout from "../layout/BlankLayout";
import _404 from "../pages/_404";

// todo 实现topBar的顶部title显示，注意优化，不要重复渲染
export default function Routes(props) {
  return (
    <Router>
      <Route component={BasicLayout}></Route>
    </Router>
  );
}
