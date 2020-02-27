import React from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router
        getUserConfirmation={(message, callback) => {
          // this is the default behavior
          const allowTransition = window.confirm(message);
          callback(allowTransition);
        }}>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/login">登录</Link>
        <Link to="/children">children</Link>
        <Link to="/render">render</Link>

        {/* <Switch> */}
        <Route exact path="/" component={HomePage} />
        <Route path="/user" component={UserPage} />
        {/* <PrivateRoute path="/user" component={UserPage} /> */}
        <Route path="/login" component={LoginPage} />

        <Route path="/children" children={() => <div>children</div>} />
        <Route path="/render" render={() => <div>render</div>} />
        {/* </Switch> */}
      </Router>
    </div>
  );
}

export default App;
