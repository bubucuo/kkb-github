import React, {Component} from "react";
import classnames from "classnames";
import {Route} from "react-router-dom";

import "./index.scss";

export default class BasicLayout extends Component {
  componentWillUnmount() {
    console.log("componentWillUnmount"); //sy-log
  }
  componentDidMount() {
    const {
      title = "默认",
      shortIcon = "https://store-images.s-microsoft.com/image/apps.64108.9007199266248398.f50070aa-ca14-4881-9e29-fb874435dc3d.a620dd2f-083d-4523-bdd5-d50a527956d4"
    } = this.props;
    document.title = title;
    document.getElementById("shortIcon").href = shortIcon;
  }
  render() {
    const {children, title, path, component, _className} = this.props;
    return (
      <article className={classnames(_className, "basicLayout")}>
        {children}
      </article>
    );
  }
}
