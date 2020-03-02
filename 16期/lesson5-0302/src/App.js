import React from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/login">登录</Link>

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          {/* <Route path="/user" component={UserPage} /> */}
          <PrivateRoute path="/user">
            <UserPage />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
