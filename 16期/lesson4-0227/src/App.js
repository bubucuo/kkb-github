import React from "react";
// import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

import {BrowserRouter as Router} from "./k-react-router-dom/BrowserRouter";
import Route from "./k-react-router-dom/Route";
import Link from "./k-react-router-dom/Link";
import Switch from "./k-react-router-dom/Switch";

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
        <Link to="/user" replace>
          用户中心
        </Link>
        <Link to="/login">登录</Link>
        <Link to="/children">children</Link>
        <Link to="/render">render</Link>
        <Link to="/search/123">搜索-动态路由</Link>

        {/* <Switch location={{pathname: "/"}}> */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* <Route path="/user" component={UserPage} /> */}
          <PrivateRoute path="/user" component={UserPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/children" children={() => <div>children</div>} />
          <Route path="/render" render={() => <div>render</div>} />
          <Route path="/search/:id" component={searchComponent} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

function searchComponent(props) {
  const {id} = props.match.params;
  console.log("searchComponent-props", props); //sy-log
  return (
    <div>
      <div>searchComponent-{id}</div>
      <Link to={"/search/" + id + "/detail"}>详情-嵌套路由</Link>
      <Route path={"/search/:id/detail"} component={DetailComponent} />
    </div>
  );
}

function DetailComponent(props) {
  const {id} = props.match.params;
  console.log("DetailComponent-props", props); //sy-log
  return <div>DetailComponent</div>;
}
