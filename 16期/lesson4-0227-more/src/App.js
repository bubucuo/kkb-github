import React from "react";
// import {BrowserRouter, Route, Link, Switch} from "react-router-dom";
import BrowserRouter from "./k-react-router-dom/BrowserRouter";
import Route from "./k-react-router-dom/Route";
import Link from "./k-react-router-dom/Link";
import Switch from "./k-react-router-dom/Switch";
import {useParams, useLocation, useHistory} from "./k-react-router-dom/hooks";

import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./pages/PrivateRoute";
import ModalSwitch from "./pages/ModalSwitch";

// 课下写一下404的补录视频
// 掌握React.Children
// 掌握createElement与cloneElement

// Switch location使用
// Route的组件为什么又包一层Provider

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/children">children</Link>
        <Link to="/render">render</Link>
        <Link to="/search/123">search</Link>
        <Link to="/modalswicth">Modal Switch</Link>
        <Link to="/login">登录</Link>

        {/* <Switch location={{pathname: "/user"}}> */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/user" component={UserPage} />
          <Route path="/children" children={() => <div>children</div>} />
          {/* <Route path="/search/:id" component={SearchComponent} /> */}
          <Route path="/search/:id" children={<SearchComponent />} />

          <Route path="/render" render={() => <div>render</div>} />
          <Route path="/modalswicth" component={ModalSwitch} />
          <Route path="/login" component={LoginPage} />
          {/* <PrivateRoute path="/user" component={UserPage} /> */}
          {/* 如果Route没有path参数，将始终被匹配 */}
          <Route render={() => <div>404</div>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

function DetailComonent(props) {
  return <div>DetailComonent</div>;
}

function SearchComponent(props) {
  console.log("use", useParams(), useLocation(), useHistory()); //sy-log
  const {id} = useParams(); //props.match.params;
  return (
    <div>
      <div>SearchComponent-{id}</div>
      <Link to="/search/123/detail">详情</Link>
      <Route path="/search/:id/detail" component={DetailComonent} />
    </div>
  );
}
