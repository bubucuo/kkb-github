import React, {Component} from "react";
import {ThemeProvider} from "../themeContext";
import {UserProvider} from "../userContext";
import ContextTypePage from "./ContextTypePage";
import ConsumerPage from "./ConsumerPage";
import MultipleContextsPage from "./MultipleContextsPage";

class ContextPage extends Component {
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
      <div className="App">
        {/* 组件跨层级通信 */}
        <button onClick={this.changeColor}>change color</button>
        {/* 如果把这里的MyProvider注释掉，ContextTypePage和ConsumerPage里将取不到theme值，而取默认值pink */}
        <ThemeProvider value={theme}>
          <ContextTypePage />
          <ConsumerPage />

          {/*多个Context */}
          <UserProvider value={user}>
            <MultipleContextsPage />
          </UserProvider>
        </ThemeProvider>
      </div>
    );
  }
}

export default ContextPage;
