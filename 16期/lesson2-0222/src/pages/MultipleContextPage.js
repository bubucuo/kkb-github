import React, {Component} from "react";
import {ThemeConsumer} from "../ThemeContext";
import {UserConsumer} from "../UserContext";

// 不建议项目中context嵌套过多，不利于性能，也不利于维护
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
