import React, {Component} from "react";
import {RouterContext} from "./RouterContext";

export default class Link extends Component {
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
