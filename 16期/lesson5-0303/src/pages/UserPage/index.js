import React, {Component} from "react";
import BasicLayout from "../../layout/BasicLayout";
import {connect} from "react-redux";

export default connect(({user}) => ({user}))(
  class UserPage extends Component {
    render() {
      const {user} = this.props;
      const {userInfo, loading, err, tip} = user;
      return (
        <BasicLayout
          title="用户中心"
          shortIcon="https://gw.alicdn.com/tfs/TB1OIxTcLc3T1VjSZLeXXbZsVXa-183-144.png?getAvatar=1">
          <h3>UserPage</h3>
          <p>id: {userInfo.id}</p>
          <p>姓名：{userInfo.name}</p>
          <p>积分：{userInfo.money}</p>
        </BasicLayout>
      );
    }
  }
);
