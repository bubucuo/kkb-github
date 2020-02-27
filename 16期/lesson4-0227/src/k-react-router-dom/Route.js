import React, {Component, Children} from "react";
import {RouterContext} from "./RouterContext";
import matchPath from "./matchPath";

// 这里的children不管是否匹配match都可以存在，这里能不能直接返回，就不判断了
// match 匹配 children是function或者是节点
// 不match 不匹配  children是function

export default class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          const {path, children, component, render} = this.props;
          // const match = context.location.pathname === path;
          const location = this.props.location || context.location;
          const match = matchPath(location.pathname, this.props);
          const props = {
            ...context,
            location,
            match
          };
          //  children, component, render 能接收到(history, location match),
          // 所以我们定义在props，传下去

          // match 渲染children, component, render 或者null
          // match的时候如果children存在：function或者children本身
          // 不match children 或者 null
          // children是和匹配无关
          return (
            <RouterContext.Provider value={props}>
              {match
                ? children
                  ? typeof children === "function"
                    ? children(props)
                    : children
                  : component
                  ? React.createElement(component, props)
                  : render
                  ? render(props)
                  : null
                : typeof children === "function"
                ? children(props)
                : null}
            </RouterContext.Provider>
          );

          // return match ? React.createElement(component, this.props) : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
