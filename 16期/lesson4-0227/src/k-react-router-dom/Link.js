import React, {Component} from "react";
import {RouterContext} from "./RouterContext";

export default class Link extends Component {
  handleClick = (event, history) => {
    event.preventDefault();
    history.push(this.props.to);
  };
  render() {
    const {to, children} = this.props;
    return (
      <RouterContext.Consumer>
        {context => (
          <a
            href={to}
            onClick={event => this.handleClick(event, context.history)}>
            {children}
          </a>
        )}
      </RouterContext.Consumer>
    );
  }
}
