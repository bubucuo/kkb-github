import React, {Component} from "react";
import {connect} from "react-redux";

export default connect(
  // mapStateToProps
  ({user}) => ({isLogin: user.isLogin}),
  // mapDispatchToProps
  {
    logout: () => ({type: "LOGOUT_SUCCESS"})
  }
)(
  class UserPage extends Component {
    render() {
      const {logout} = this.props;
      return (
        <div>
          <h3>UserPage</h3>
          <button onClick={logout}>click logout </button>
        </div>
      );
    }
  }
);
