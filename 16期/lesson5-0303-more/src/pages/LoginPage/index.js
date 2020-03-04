import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {loginAction} from "../../action/login";
import "./index.scss";

export default connect(({user}) => ({user}), {
  login: userInfo => ({type: "loginSaga", payload: userInfo})

  // login: userInfo => ({type: "LOGIN_SUCCESS", payload: userInfo})
  //login: userInfo => dispatch => {
  // loginAction(dispatch, userInfo);
  // dispatch({type: "LOGIN_REQUEST"}); //展示loading
  // 去login请求
  // setTimeout(() => {
  //   dispatch({type: "LOGIN_SUCCESS", payload: userInfo});
  // }, 1000);
  //}
})(
  class LoginPage extends Component {
    constructor(props) {
      super(props);
      this.state = {name: ""};
    }
    render() {
      const {login, user, location} = this.props;
      const {isLogin, loading, err, tip} = user;
      if (isLogin) {
        const {redirect = "/"} = location.state || {};
        return <Redirect to={redirect} />;
      }
      const {name} = this.state;
      return (
        <div className="loginPage">
          <h3>LoginPage</h3>
          <input
            type="text"
            value={name}
            onChange={event => this.setState({name: event.target.value})}
          />
          <p className="red">{err.msg}</p>
          <button onClick={() => login({name})}>
            {loading ? "登录中..." : "登录"}
          </button>
          <p className="green">{tip.msg}</p>
        </div>
      );
    }
  }
);
