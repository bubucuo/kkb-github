import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

export default connect(
  // mapStateToProps
  ({user}) => ({isLogin: user.isLogin}),
  // mapDispatchToProps
  {
    login: () => ({type: "LOGIN_SUCCESS"})
  }
)(
  class LoginPage extends Component {
    render() {
      const {isLogin, login, location} = this.props;
      const {redirect = "/"} = location.state || {};
      console.log("props", this.props); //sy-log
      if (isLogin) {
        // 已经登录
        return <Redirect to={redirect} />;
      } else {
        return (
          <div>
            <h3>LoginPage</h3>
            <button onClick={login}>login click</button>
          </div>
        );
      }
    }
  }
);
