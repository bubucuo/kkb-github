import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

export default connect(({user}) => ({isLogin: user.isLogin}))(
  class PrivateRoute extends Component {
    render() {
      const {isLogin, path, component} = this.props;
      console.log("Pro", this.props); //sy-log
      if (isLogin) {
        // 登录 就可以去路由守卫的地方了
        return <Route path={path} component={component} />;
      } else {
        // 没有登录 就去登录页
        // !记录来源 因为登录完成还得再跳回去
        // !如果来源为空 我们一般呢 跳转回去首页
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: {redirect: path}
            }}
          />
        );
      }
      return (
        <div>
          <h3>PrivateRoute</h3>
        </div>
      );
    }
  }
);
