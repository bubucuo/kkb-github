import React, {Component} from "react";
import {connect} from "react-redux";

export default connect(
  // mapStateToProps
  ({user}) => ({user}),
  // mapDispatchToProps
  {
    logout: () => ({type: "LOGOUT_SUCCESS"})
  }
)(
  class UserPage extends Component {
    render() {
      const {user, logout} = this.props;
      const {userInfo} = user;
      return (
        <div>
          <h3>UserPage</h3>
          <p>姓名：{userInfo.name}</p>
          <p>金额：{userInfo.money} 元</p>
          <button onClick={logout}>退出登录</button>
        </div>
      );
    }
  }
);
