import React, {Component} from "react";
import {createBrowserHistory, createLocation} from "history";
import matchPath from "./k-react-router-dom/matchPath";
import generatePath from "./k-react-router-dom/generatePath";

const RouterContext = React.createContext();

export class BrowserRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.history = createBrowserHistory();
    this.state = {
      location: this.history.location
    };
    this.unlisten = this.history.listen(location => {
      this.setState({
        location: location
      });
    });
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }

  render() {
    return (
      <RouterContext.Provider
        children={this.props.children}
        value={{history: this.history, location: this.state.location}}
      />
    );
  }
}

export class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          // 优先从props中取值
          const location = this.props.location || context.location;
          //  优先从props中取值计算

          const match = this.props.computedMatch
            ? this.props.computedMatch
            : this.props.path
            ? matchPath(location.pathname, this.props)
            : context.match;
          const props = {
            ...context,
            location,
            match
          };
          let {path, children, component, render} = this.props;
          // match  渲染这三者之一：children  component render或者null
          // 不match，渲染children 或者 null
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
        }}
      </RouterContext.Consumer>
    );
  }
}

export class Link extends Component {
  static contextType = RouterContext;
  handleClick = event => {
    event.preventDefault();
    this.context.history.push(this.props.to);
  };
  render() {
    const {to} = this.props;
    return (
      <a href={to} onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}

export class Switch extends Component {
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

export class Redirect extends Component {
  render() {
    console.log("Redirect", this.props); //sy-log
    return (
      <RouterContext.Consumer>
        {context => {
          const {history} = context;
          const {computedMatch, to} = this.props;
          const location = createLocation(
            computedMatch
              ? {
                  ...to,
                  pathname: generatePath(...to.pathname, computedMatch.params)
                }
              : to
          );
          return (
            <Lifecycle
              onMount={() => {
                // method(location);
              }}
              onUpdate={(self, prevProps) => {
                const prevLocation = createLocation(prevProps.to);
                // if (
                //   !locationsAreEqual(prevLocation, {
                //     ...location,
                //     key: prevLocation.key
                //   })
                // ) {
                //   // method(location);
                // }
              }}
              to={to}
            />
          );
        }}
      </RouterContext.Consumer>
    );
  }
}

export class Lifecycle extends React.Component {
  componentDidMount() {
    if (this.props.onMount) this.props.onMount.call(this, this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.onUpdate) this.props.onUpdate.call(this, this, prevProps);
  }

  componentWillUnmount() {
    if (this.props.onUnmount) this.props.onUnmount.call(this, this);
  }

  render() {
    return null;
  }
}
