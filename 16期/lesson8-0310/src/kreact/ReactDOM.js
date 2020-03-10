// 下一个子任务
let nextUnitOfWork = null;
// work in progreess 工作中的fiber root
let wipRoot = null;

// 现在的根节点
let currentRoot = null;

function render(vnode, container) {
  wipRoot = {
    node: container,
    props: {children: [vnode]},
    base: currentRoot
  };
}

// 根据vnode，创建一个node
function createNode(vnode) {
  const {type, props} = vnode;
  let node;
  if (typeof type === "function") {
    node = type.isReactComponent
      ? // node = type.prototype.isReactComponent
        updateClassComponent(vnode)
      : updateFunctionComponent(vnode);
  } else if (type === "TEXT") {
    node = document.createTextNode("");
  } else if (type) {
    node = document.createElement(type);
  } else {
    node = document.createDocumentFragment();
  }
  updateNode(node, props);
  reconcilerChildren(props.children, node);
  return node;
}

function reconcilerChildren(children, node) {
  for (let i = 0; i < children.length; i++) {
    // console.log("children", children[i]); //sy-log
    let child = children[i];
    // 遍历 创建元素
    // 判读children[i]类型
    if (Array.isArray(child)) {
      for (let j = 0; j < child.length; j++) {
        render(child[j], node);
      }
    } else {
      render(children[i], node);
    }
  }
}

// 更新节点上属性，如className、nodeValue等
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      if (k.slice(0, 2) === "on") {
        // 以on开头，就认为是一个事件，源码处理复杂一些，
        let eventName = k.slice(2).toLocaleLowerCase();
        node.addEventListener(eventName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
    });
}

// function组件，返回node
function updateFunctionComponent(vnode) {
  const {type, props} = vnode;
  const vvnode = type(props);
  const node = createNode(vvnode);
  return node;
}

function updateClassComponent(vnode) {
  const {type, props} = vnode;
  const cmp = new type(props); //实例化
  const vvnode = cmp.render();
  const node = createNode(vvnode);
  return node;
}

function updateHostComponent(fiber) {}

function performUnitOfWork(fiber) {
  // 执行当前子任务
  // todo
  updateHostComponent(fiber);
  // 返回下一个子任务
  // 找到下个任务的原则：先找子元素
  if (fiber.child) {
    return fiber.child;
  }
  // 如果没有子元素，寻找兄弟元素
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
  // return
}

function workLoop(deadline) {
  // 执行子任务
  // 返回下一个子任务
  // ...
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    //有下个子任务，并且当前帧还没有结束
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  // 没有子任务了，
  if (!nextUnitOfWork && wipRoot) {
    // 提交
    // commit
  }
  // 提交
}

requestIdleCallback(workLoop);

export default {
  render
};
