import React, {Component} from "react";
import {createBrowserHistory, createLocation} from "history";
import generatePath from "./generatePath";
import {RouterContext} from "./RouterContext";

export default class Redirect extends Component {
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
          const method = history.replace;
          return <Lifecycle onMount={() => method(location)} />;
        }}
      </RouterContext.Consumer>
    );
  }
}

export class Lifecycle extends React.Component {
  componentDidMount() {
    if (this.props.onMount) this.props.onMount.call(this, this);
  }

  render() {
    return null;
  }
}
