import React from "react";
import ContextPage from "./pages/ContextPage";
import ReduxPage from "./pages/ReduxPage";

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

// let res = f1(f2(f3("omg")));
// console.log("res", res);

// let res = compose(f1, f2, f3)("omg");
// let res = compose()("omg");

// console.log("res", res);

// function compose(...funcs) {
//   if (funcs.length === 0) {
//     // return arg => arg;
//     return () => {};
//   }
//   if (funcs.length === 1) {
//     return funcs[0];
//   }
//   return funcs.reduce((a, b) => (...args) => a(b(...args)));
// }

function App() {
  return (
    <div className="App">
      {/* context 上下文 */}
      {/* <ContextPage /> */}

      {/* Redux学习 */}
      <ReduxPage />
    </div>
  );
}

export default App;
