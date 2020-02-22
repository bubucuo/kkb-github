import React from "react";
import ContextPage from "./pages/ContextPage";
import ReduxPage from "./pages/ReduxPage";
import ReactReduxPage from "./pages/ReactReduxPage";

// 有如下函数， 聚合成一个函数，并把第一个函数的返回值传递给下一个函数，如何处理。
function f1(arg) {
  console.log("f1", arg);
  return arg;
}
function f2(arg) {
  console.log("f2", arg);
  return arg;
}
function f3(arg) {
  console.log("f3", arg);
  return arg;
}

// const res = f1(f2(f3("omg")));
// console.log("res", res); //sy-log

// const res = compose(f1, f2, f3)("omg");
// console.log("res", res); //sy-log

function compose(...funcs) {
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

function App() {
  return (
    <div className="App">
      {/* 组件跨层级通信 */}
      {/* <ContextPage /> */}

      {/* Redux学习 */}
      {/* <ReduxPage /> */}

      {/* ReactRedux 学习 */}
      <ReactReduxPage />
    </div>
  );
}

export default App;
