import React, {Component} from "react";
import ContextTypePage from "./ContextTypePage";
import MultipleContextPage from "./MultipleContextPage";
import {ThemeProvider} from "../ThemeContext";

import ConsumerPage from "./ConsumerPage";
import {UserProvider} from "../UserContext";

export default class ContextPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: {
        themeColor: "red"
      },
      user: {
        name: "xiaoming"
      }
    };
  }
  changeColor = () => {
    const {themeColor} = this.state.theme;
    this.setState({
      theme: {
        themeColor: themeColor === "red" ? "green" : "red"
      }
    });
  };
  render() {
    const {theme, user} = this.state;
    return (
      <div>
        <h3>ContextPage</h3>
        <button onClick={this.changeColor}>change color</button>
        <ThemeProvider value={theme}>
          {/* <ContextTypePage /> */}
          <ConsumerPage />
          <UserProvider value={user}>
            {/* <ContextTypePage /> */}
            <MultipleContextPage />
          </UserProvider>
        </ThemeProvider>
      </div>
    );
  }
}
