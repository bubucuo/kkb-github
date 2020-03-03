import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./static/js/flexible";
import "./static/style/iconfont/iconfont.css";
import {Provider} from "react-redux";
import store from "./store/";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// function与函数名之间有个*
// yield只能使用在generator中，在别的地方用会报错
// yield定义了内部不同的状态

// var a = 0;
// function* helloWorldGenerator() {
//   yield (a = 1 + 1);
//   // yield "hello";
//   // yield "world";
//   // return "ending";
// }

// var hw = helloWorldGenerator(); //返回的是一个遍历器对象
// console.log(hw.next()); //只有调用next方法才会遍历下一个内部状态。惰性求值
// console.log("a", a); //sy-log

// //执行

// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());
