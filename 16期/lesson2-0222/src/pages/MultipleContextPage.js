import React, {Component} from "react";
import {ThemeConsumer} from "../ThemeContext";
import {UserConsumer} from "../userContext";

export default class MultipleContextPage extends Component {
  render() {
    return (
      <div>
        <h3>MultipleContextPage</h3>
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
