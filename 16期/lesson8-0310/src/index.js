// import React from "react";
// import ReactDOM from "react-dom";
import React from "./kreact/";
import ReactDOM from "./kreact/ReactDOM";
import Component from "./kreact/Component";
import "./index.css";

function FunctionComponent({name}) {
  return (
    <div className="border function">
      hello, {name}
      <button onClick={() => console.log("omg")}>click</button>
    </div>
  );
}

class ClassComponent extends Component {
  static defaultProps = {
    color: "pink"
  };
  render() {
    const {name, color} = this.props;
    return (
      <div className="border function">
        hello, {name}
        <p className={color}>defaultProps</p>
      </div>
    );
  }
}

const jsx = (
  <div className="border">
    <p>这是一个文本</p>
    <a href="https://kaikeba.com/">开课吧</a>
    <div className="border">
      <h5>hello</h5>
    </div>
    <FunctionComponent name="function" />
    <ClassComponent name="class" color="red" />
    {/* <>
      <h5>文本1</h5>
      <h5>文本2</h5>
    </> */}

    {/* {[1, 2, 3].map(item => {
      return (
        <div className="border" key={item}>
          <p>{item}</p>
          <p>{item}</p>
        </div>
      );
    })} */}
  </div>
);

// element， container
// vnode->node , 把node渲染更新到container
ReactDOM.render(jsx, document.getElementById("root"));

// !节点类型
// 文本节点
// html标签节点 HostComponent
// class componet
// function component
// fragment

// jsx=>createElement(生成element，就是我们需要的虚拟dom)=>render(vnode->node, 再把node渲染到container)
// vnode->node的流程注意下节点的区分，不同节点处理方式不同
