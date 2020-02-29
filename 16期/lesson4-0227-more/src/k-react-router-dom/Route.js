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
          const {path, computedMatch, children, component, render} = this.props;
          // const match = context.location.pathname === path;
          const location = this.props.location || context.location;
          const match = computedMatch
            ? computedMatch
            : path
            ? matchPath(location.pathname, this.props)
            : context.match;
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

          //这里只是简单处理 ，所以呢 我们还是不要自己去创建element了，还是用createElement
          // let element;
          // if (match && component) {
          //   console.log(
          //     "component",
          //     component,
          //     React.isValidElement(component)
          //   ); //sy-log
          //   // 如果这里想要用cloneElement，首先得有个element
          //   if (typeof component === "function") {
          //     // class function
          //     // 怎么判断class组件和function组件
          //     if (component.prototype.isReactComponent) {
          //       // class组件
          //       const cmp = new component(component.props);
          //       element = cmp.render();
          //     } else {
          //       //function组件
          //       element = component(props);
          //     }
          //   } else {
          //     // 对象
          //     const cmp = new component.WrappedComponent({user: {}, ...props});
          //     element = cmp.render();
          //   }
          // }
          return (
            <RouterContext.Provider value={props}>
              {match
                ? children
                  ? typeof children === "function"
                    ? children(props)
                    : children
                  : component
                  ? // ? React.cloneElement(element, props)
                    React.createElement(component, props)
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
