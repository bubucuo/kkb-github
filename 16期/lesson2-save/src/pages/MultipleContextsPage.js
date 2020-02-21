import React, {Component} from "react";
import {ThemeConsumer} from "../themeContext";
import {UserConsumer} from "../userContext";

export default class MultipleContextsPage extends Component {
  render() {
    return (
      <div className="border">
        <h3>MultipleContextsPage</h3>
        <ThemeConsumer>
          {theme => (
            <UserConsumer>
              {user => <div className={theme.themeColor}>{user.name}</div>}
            </UserConsumer>
          )}
        </ThemeConsumer>
      </div>
    );
  }
}
