import React, {Component} from "react";
import BottomNav from "../../components/BottomNav";
import TopBar from "../../components/TopBar";
import classnames from "classnames";
import "./index.scss";

export default class BasicLayout extends Component {
  componentDidMount() {
    const {
      title = "商城",
      shortIcon = "https://store-images.s-microsoft.com/image/apps.64108.9007199266248398.f50070aa-ca14-4881-9e29-fb874435dc3d.a620dd2f-083d-4523-bdd5-d50a527956d4"
    } = this.props;
    document.title = title;
    document.getElementById("shortIcon").href = shortIcon;
  }
  render() {
    const {
      children,
      showTopBar = true,
      title = "商城",
      _className
    } = this.props;
    return (
      <div className={classnames("basicLayout", _className)}>
        {showTopBar && <TopBar title={title} />}
        <article>{children}</article>
        <BottomNav />
      </div>
    );
  }
}
