// !vnode代表虚拟dom节点
// !node代表真实dom节点

function render(vnode, container) {
  // vnode->node
  const node = createNode(vnode, container);
  node && container.appendChild(node);
}

// 返回一个真实的dom节点
function createNode(vnode, parentNode) {
  const {type, props} = vnode;
  let node = null;
  if (typeof type === "function") {
    // node = type.isReactComponent;
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode, parentNode)
      : updateFunctionComponent(vnode, parentNode);
  } else if (type === "TEXT") {
    node = document.createTextNode("");
  } else if (type) {
    node = document.createElement(type);
  }
  if (type === undefined) {
    // fragment
    reconcilerChildren(vnode, parentNode);
  } else {
    reconcilerChildren(vnode, node);
    updateNode(node, props);
  }
  return node;
}

function reconcilerChildren(vnode, node) {
  const {children} = vnode.props;
  for (let i = 0; i < children.length; i++) {
    render(children[i], node);
  }
}

function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      if (k.slice(0, 2) === "on") {
        let eventName = k.slice(2).toLocaleLowerCase();
        node.addEventListener(eventName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
    });
}

// 接收vnode，返回一个node
function updateFunctionComponent(vnode, parentNode) {
  const {type, props} = vnode;
  const vvnode = type(props);
  const node = createNode(vvnode, parentNode);
  return node;
}

// 接收vnode，返回一个node
function updateClassComponent(vnode, parentNode) {
  const {type, props} = vnode;
  const cmp = new type(props);
  const vvnode = cmp.render();
  const node = createNode(vvnode, parentNode);
  return node;
}

export default {render};
