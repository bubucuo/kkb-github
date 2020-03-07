// /React.createElement 生成虚拟dom
// import React from "react";
// import ReactDOM from "react-dom";
import React from "./kReact/";
import ReactDOM from "./kReact/ReactDOM";
import Component from "./kReact/Component";

import "./index.css";

function FunctionComponent({name}) {
  return (
    <div className="function border">
      {name}-组件
      <button onClick={() => console.log("click")}>click</button>
    </div>
  );
}

class ClassComponent extends Component {
  render() {
    const {name} = this.props;
    return <div className="class border">{name}-组件</div>;
  }
}

const jsx = (
  <div className="border">
    <p>这是个文本</p>
    <a href="https://kaikeba.com/">开课吧</a>
    <FunctionComponent name="function" />
    <ClassComponent name="class" />
    <>
      <h5>文本1</h5>
      <h5>文本2</h5>
    </>
  </div>
);

// render (虚拟dom, container) 虚拟dom->真实dom节点，插入容器
ReactDOM.render(jsx, document.getElementById("root"));

console.log("version", React.version); //sy-log

// !节点类型
// 文本节点
// HTML标签节点
// function组件
// class组件
// fragment
