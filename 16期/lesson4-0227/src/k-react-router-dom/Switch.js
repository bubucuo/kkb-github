import React, {Component} from "react";
import {RouterContext} from "./RouterContext";
import matchPath from "./matchPath";

export default class Switch extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          const location = this.props.location || context.location;
          let element, match;
          // 使用 React.Children.forEach 做遍历，而不是 React.Children.toArray().find()
          // 因为 toArray 会给所有child元素增加key，这样会出发卸载/重新加载
          React.Children.forEach(this.props.children, child => {
            if (match == null && React.isValidElement(child)) {
              element = child;
              const path = child.props.path || child.props.from;
              match = path
                ? matchPath(location.pathname, {
                    ...child.props,
                    path
                  })
                : context.match;
            }
          });
          return match
            ? React.cloneElement(element, {location, computedMatch: match})
            : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
