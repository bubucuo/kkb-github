import React, {Component} from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import HomePage from "./HomePage";
import UserPage from "./UserPage";
import LoginPage from "./LoginPage";
import PrivateRoute from "./PrivateRoute";

export default class RouterPage extends Component {
  render() {
    return (
      <div>
        <h3>RouterPage</h3>
        <Router>
          <Link to="/">首页</Link>
          <Link to="/user">用户中心</Link>
          <Link to="/login">登录</Link>
          <Link to="/search/123">搜索</Link>

          {/*Route一定要包裹在Router之内 因为Route要适应history location，这些来自router  */}
          {/* path值如果不写 则一直匹配 */}
          <Switch>
            <Route exact path="/" component={HomePage} />
            {/* <Route path="/user" component={UserPage} /> */}
            <PrivateRoute path="/user" component={UserPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/search/:id" component={SearchComponent} />
            <Route render={() => <div>404</div>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

function DetailComponent(props) {
  return <div>DetailComponent</div>;
}

function SearchComponent(props) {
  console.log("SearchComponent", props); //sy-log
  const {id} = props.match.params;
  return (
    <div>
      SearchComponent - {id}
      <Link to={"/search/" + id + "/detail"}>详情</Link>
      <Route path={"/search/:" + id + "/detail"} component={DetailComponent} />
    </div>
  );
}
