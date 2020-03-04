import React, {Component} from "react";
import {Link, NavLink} from "react-router-dom";
import "./index.scss";

export default class BottomNav extends Component {
  componentWillUnmount() {
    console.log("BottomNav-componentWillUnmount"); //sy-log
  }
  render() {
    return (
      <ul className="bottomNav">
        {this.props.menu.map(item =>
          item._1stNav ? <MenuItem key={item.path} {...item} /> : null
        )}
      </ul>
    );
  }
}

function MenuItem({path, title, icon, children}) {
  return (
    <NavLink exact to={path} activeClassName="selected" className="menuItem">
      <span className={"iconfont icon-" + icon}></span>
      <div>{title}</div>
    </NavLink>
  );
}
