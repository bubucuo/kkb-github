import React, {Component} from "react";
import BasicLayout from "../../layout/BasicLayout/";
import {connect} from "react-redux";

export default connect(({user}) => ({user}), {
  logout: userInfo => ({type: "logoutSaga", payload: userInfo})
})(
  class UserPage extends Component {
    render() {
      const {user, logout} = this.props;
      const {userInfo} = user;
      return (
        <BasicLayout
          title="我的淘宝"
          shortIcon="https://gw.alicdn.com/tfs/TB1OIxTcLc3T1VjSZLeXXbZsVXa-183-144.png?getAvatar=1">
          <h3>UserPage</h3>
          <p>id：{userInfo.id}</p>
          <p>昵称：{userInfo.name}</p>
          <p>积分：{userInfo.money}</p>

          <button onClick={() => logout(userInfo)}>退出登录</button>
        </BasicLayout>
      );
    }
  }
);
