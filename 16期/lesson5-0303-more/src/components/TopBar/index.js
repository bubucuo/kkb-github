import React, {Component, useEffect} from "react";
import {useHistory, useLocation} from "react-router-dom";

import "./index.scss";

// export default class TopBar extends Component {
//   render() {
//     const {title} = this.props;
//     return (
//       <div className="topBar">
//         <span onClick={()=>hi} className="iconfont icon-jiantou-copy"></span>
//         <div className="menuItem">{title}</div>
//       </div>
//     );
//   }
// }

function matchRoute(routes, location) {
  let title;
  for (let i = 0; i < routes.length; i++) {
    let item = routes[i];
    if (item.path === location.pathname) {
      return item;
    }
  }
  return {};
}

export default function TopBar({routes}) {
  let currentConfig = matchRoute(routes, useLocation());
  const history = useHistory();
  return currentConfig.showTabBar === false ? null : (
    <div className="topBar">
      <span
        onClick={() => history.go(-1)}
        className="iconfont icon-jiantou-copy"></span>
      <div className="menuItem">{currentConfig.title}</div>
    </div>
  );
}
