import React, {Component} from "react";
import {ThemeConsumer} from "../themeContext";

export default class ConsumerPage extends Component {
  render() {
    return (
      <div className="border">
        <h3>ConsumerPage</h3>
        <ThemeConsumer>{ctx => <HandleTabBar {...ctx} />}</ThemeConsumer>
      </div>
    );
  }
}

function HandleTabBar({themeColor}) {
  console.log("themeColor", themeColor); //sy-log
  return <div className={themeColor}>文本</div>;
}
