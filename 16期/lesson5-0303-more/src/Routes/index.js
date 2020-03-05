import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import BasicLayout from "../layout/BasicLayout/";
import UserPage from "../pages/UserPage";
import LoginPage from "../pages/LoginPage";

// todo 实现topBar的顶部title显示，注意优化，不要重复渲染
export default function Routes(props) {
  return (
    <Router>
      {/* <Route component={BasicLayout}></Route> */}
      <BasicLayout>
        {/* <Route component={BasicLayout}> */}
        <Switch>
          <Route path="/user" component={UserPage} />
          <Route path="/login" component={LoginPage} />
        </Switch>
        {/* </Route> */}
      </BasicLayout>
    </Router>
  );
}
