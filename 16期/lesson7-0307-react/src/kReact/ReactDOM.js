function render(vnode, container) {
  console.log("vnode", vnode); //sy-log
  // vnode->node
  const node = createNode(vnode);
  //把node更新到container
  container.appendChild(node);
}

// 根据vnode，创建一个node
function createNode(vnode) {
  const {type, props} = vnode;
  let node;
  if (type === "TEXT") {
    node = document.createTextNode("");
  } else {
    node = document.createElement(type);
  }
  updateNode(node, props);
  reconcilerChildren(props.children, node);
  return node;
}

function reconcilerChildren(children, node) {
  for (let i = 0; i < children.length; i++) {
    // 遍历 创建元素
    render(children[i], node);
  }
}

// 更新节点上属性，如className、nodeValue等
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      node[k] = nextVal[k];
    });
}

export default {
  render
};
