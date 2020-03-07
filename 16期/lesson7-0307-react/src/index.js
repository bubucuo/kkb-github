// import React from "react";
// import ReactDOM from "react-dom";
import React from "./kreact/";
import ReactDOM from "./kreact/ReactDOM";
import "./index.css";

const jsx = (
  <div className="border">
    <p>这是一个文本</p>
    <a href="https://kaikeba.com/">开课吧</a>
    <div className="border">
      <h5>hello</h5>
    </div>
  </div>
);

// element， container
// vnode->node , 把node渲染更新到container
ReactDOM.render(jsx, document.getElementById("root"));

// !节点类型
// 文本节点
// html标签节点
