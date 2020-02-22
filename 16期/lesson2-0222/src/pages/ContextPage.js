import React, {Component} from "react";
import ContextTypePage from "./ContextTypePage";
import ConsumerPage from "./ConsumerPage";
import MultipleContextPage from "./MultipleContextPage";
import {ThemeProvider} from "../ThemeContext";
import {UserProvider} from "../userContext";

// 使用contetx步骤
// 1. 创建 createContext
// 2. Proiver接收value，以保证有传下去的数据
// 3. 接收 Consumer或者class.contextType

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
        <button onClick={this.changeColor}>change color</button>
        <h3>ContextPage</h3>
        <ThemeProvider value={theme}>
          {/* 只能订阅一个context */}
          <ContextTypePage />

          <ConsumerPage />
          <UserProvider value={user}>
            <MultipleContextPage />
          </UserProvider>
        </ThemeProvider>
      </div>
    );
  }
}
