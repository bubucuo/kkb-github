import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";

export default connect(({user}) => ({isLogin: user.isLogin}))(
  class LoginPage extends Component {
    render() {
      const {isLogin, location, dispatch} = this.props;
      const {redirect = "/"} = location.state || {};
      if (isLogin) {
        // 登录 就去来的地方 或者首页
        return <Redirect to={redirect} />;
      } else {
        // 没有登录 显示登录页
        return (
          <div>
            <h3>LoginPage</h3>
            <button
              onClick={() => {
                dispatch({type: "loginSuccess"});
              }}>
              click
            </button>
          </div>
        );
      }
    }
  }
);
