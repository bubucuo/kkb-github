import React, {Component} from "react";
import {ThemeContext} from "../ThemeContext";
import {UserContext} from "../UserContext";

class ContextTypePage extends Component {
  // 挂载在class上的contextType属性会被重新赋值为一个由React.createContext创建的Context对象，这样我们就能使用
  // this.context来消费最近的Context上的那个值
  // 只能订阅一个一个context
  static contextType = ThemeContext;
  // static contextType = UserContext;

  render() {
    console.log("this", this); //sy-log
    const {themeColor} = this.context;
    return (
      <div className="border">
        <h3 className={themeColor}>ContextTypePage</h3>
        {/* 不管跨越多少层级，context都能传递下去 */}
        <Child />
      </div>
    );
  }
}

// ContextTypePage.contextType = ThemeContext;

class Child extends Component {
  static contextType = ThemeContext;
  render() {
    const {themeColor} = this.context;
    return <h3 className={themeColor}>Child</h3>;
  }
}

export default ContextTypePage;
