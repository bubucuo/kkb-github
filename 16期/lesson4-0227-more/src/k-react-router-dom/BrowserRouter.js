import React, {Component} from "react";
import {createBrowserHistory} from "history";
import {RouterContext} from "./RouterContext";

export default class BrowserRouter extends Component {
  static computeRootMatch(pathname) {
    return {
      path: "/",
      url: "/",
      params: {},
      isExact: pathname === "/"
    };
  }
  constructor(props) {
    super(props);
    this.history = createBrowserHistory();
    this.state = {
      location: this.history.location
    };
    this.unlisten = this.history.listen(location => {
      this.setState({location});
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
        value={{
          history: this.history,
          location: this.state.location,
          match: BrowserRouter.computeRootMatch(this.state.location.pathname)
        }}>
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}
