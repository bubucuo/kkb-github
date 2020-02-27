import React, {Component} from "react";
import {createBrowserHistory} from "history";
import {RouterContext} from "./RouterContext";

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
