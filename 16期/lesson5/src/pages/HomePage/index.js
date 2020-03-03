import React, {Component} from "react";
import BasicLayout from "../../layout/BasicLayout/";

export default class HomePage extends Component {
  render() {
    return (
      <BasicLayout showTopBar={false} title="首页">
        <h3>HomePage</h3>
      </BasicLayout>
    );
  }
}
