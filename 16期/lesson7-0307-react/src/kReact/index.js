//!vnode 就代表虚拟dom节点
//! node代表真实dom节点

// 接收type, props, children， 返回一个vnode
function createElement(type, props, ...children) {
  delete props.__source;
  delete props.__self;

  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === "object" ? child : createTextNode(child)
      )
    }
  };
}

function createTextNode(text) {
  return {
    type: "TEXT",
    props: {
      children: [],
      nodeValue: text
    }
  };
}
export default {
  createElement
};
