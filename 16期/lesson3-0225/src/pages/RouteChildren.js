import React, {Component} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

function ListItemLink({to, name, ...rest}) {
  return (
    <Route
      path={to}
      children={({match}) => (
        <li className={match ? "active" : ""}>
          <Link to={to} {...rest}>
            {name}
          </Link>
        </li>
      )}
    />
  );
}

export default class RouteChildren extends Component {
  render() {
    return (
      <div>
        <h3>RouteChildren</h3>
        <Router>
          <ul>
            <ListItemLink to="/somewhere" name="链接1" />
            <ListItemLink to="/somewhere-else" name="链接2" />
          </ul>
        </Router>
      </div>
    );
  }
}
