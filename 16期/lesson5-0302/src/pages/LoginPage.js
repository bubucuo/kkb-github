import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {loginAction} from "../action/login";

export default connect(
  ({user}) => ({
    user
  }),
  //mapDispatchToProps
  {
    login: userInfo => dispatch => {
      loginAction(dispatch, userInfo);
    }
  }
)(
  class LoginPage extends Component {
    constructor(props) {
      super(props);
      this.state = {name: ""};
    }
    render() {
      const {history, location, user, login} = this.props;
      const {isLogin, loading, err} = user;

      if (isLogin) {
        const {redirect = "/"} = location.state || {};
        return <Redirect to={redirect} />;
      }

      const {name} = this.state;
      return (
        <div>
          <h3>LoginPage</h3>
          <input
            type="text"
            value={name}
            onChange={event => this.setState({name: event.target.value})}
          />
          {err && <p className="red">{err.msg}</p>}
          <button onClick={() => login({name})}>
            {loading ? "loading..." : "login"}
          </button>
        </div>
      );
    }
  }
);
