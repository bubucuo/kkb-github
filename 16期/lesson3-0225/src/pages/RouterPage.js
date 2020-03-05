import React, {Component} from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useParams,
  useLocation,
  withRouter
} from "react-router-dom";
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
            <Route path="/search/:id" children={<SearchComponent />} />
            <Route render={() => <div>404</div>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

// function DetailComponent(props) {
//   console.log("use", useLocation()); //sy-log
//   return <div>DetailComponent</div>;
// }

class DetailComponent extends Component {
  render() {
    const Cmp = withRouter(
      class Detail extends Component {
        render() {
          // 可以试试去掉withRouter
          console.log("detail", this.props); //sy-log
          return (
            <div>
              <div>DetailComponent</div>
            </div>
          );
        }
      }
    );
    return <Cmp />;
  }
}

function SearchComponent(props) {
  console.log("SearchComponent", props); //sy-log
  const {id} = useParams(); // props.match.params;
  return (
    <div>
      SearchComponent - {id}
      <Link to={"/search/" + id + "/detail"}>详情</Link>
      <Route
        path={"/search/:" + id + "/detail"}
        children={<DetailComponent />}
      />
    </div>
  );
}
