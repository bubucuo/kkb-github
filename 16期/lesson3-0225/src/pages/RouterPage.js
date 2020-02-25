import React, {Component} from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import HomePage from "./HomePage";
import UserPage from "./UserPage";
import LoginPage from "./LoginPage";
import PrivateRoute from "./PrivateRoute";

// router在项目开发中，要放在根组件外层
export default class RouterPage extends Component {
  render() {
    return (
      <Router>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/login">登录</Link>
        <Link to="/search/123">搜索</Link>

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          {/* <Route path="/user" component={UserPage} /> */}
          <PrivateRoute path="/user" component={UserPage} />
          <Route path="/search/:id" component={SearchComponent} />
        </Switch>
      </Router>
    );
  }
}

function SearchComponent(props) {
  console.log("props", props); //sy-log
  const {id} = props.match.params;
  return (
    <div>
      <h3>SearchComponent</h3>
      <p>{id}</p>
      <Link to={"/search/" + id + "/detail"}>详情</Link>
      <Route path="/search/:id/detail" component={DetailComponent} />
    </div>
  );
}

function DetailComponent(props) {
  return <div>DetailComponent</div>;
}
