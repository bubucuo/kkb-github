import React, {Component} from "react";
import {createBrowserHistory} from "history";

const RouterContext = React.createContext();

export class BrowserRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.history = createBrowserHistory();
    this.history.listen(location => {
      console.log("location", location); //sy-log
    });
  }
  render() {
    console.log("history", this.history); //sy-log
    return (
      <RouterContext.Provider
        children={this.props.children}
        value={{history: this.history}}
      />
    );
  }
}

export class Route extends Component {
  render() {
    const {path, component} = this.props;
    const match = window.location.pathname === path;
    // 这里先处理component， render和children，大家思考下，我们课上再实现
    return match ? React.createElement(component, this.props) : null; ///this.props.children;
  }
}

export class Link extends Component {
  static contextType = RouterContext;
  handleClick = event => {
    const {history} = this.context;
    event.preventDefault();
    history.push(this.props.to);
  };
  render() {
    return (
      <a href={this.props.to} onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}
