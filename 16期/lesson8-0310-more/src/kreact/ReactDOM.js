import {PLACEMENT} from "./CONST";
// todo 拓展视频 useState 实现update 以及 DELETIONS

// 下一个子任务
let nextUnitOfWork = null;
// work in progreess 工作中的fiber root
let wipRoot = null;

// 现在的根节点
let currentRoot = null;

// 初始化
function render(vnode, container) {
  wipRoot = {
    node: container,
    props: {children: [vnode]},
    base: currentRoot
  };
  nextUnitOfWork = wipRoot;
}

// 根据vnode，创建一个node
function createNode(vnode) {
  const {type, props} = vnode;
  let node;
  if (type === "TEXT") {
    node = document.createTextNode("");
  } else if (type) {
    node = document.createElement(type);
  }
  updateNode(node, props);
  return node;
}

// 构建fiber结构，遍历workInProgressFiber的子节点
function reconcilerChildren(workInProgressFiber, children) {
  // 构建fiber结构
  // 数组
  // 更新  删除 新增
  let prevSibling = null;
  let oldFiber = workInProgressFiber.base && workInProgressFiber.base.child;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    let newFiber = null;
    // todo 比较 type key

    newFiber = {
      type: child.type, //类型 区分不同的fiber，比如说function class host等
      props: child.props, //属性参数等
      node: null, //真实dom节点
      base: null, //存储fiber，便于去比较
      parent: workInProgressFiber,
      effectTag: PLACEMENT
    };

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    // parent
    // child
    if (i === 0) {
      workInProgressFiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
      // sibling
    }
    prevSibling = newFiber;
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

// function组件，构建fiber
function updateFunctionComponent(fiber) {
  const {type, props} = fiber;
  const children = [type(props)];
  reconcilerChildren(fiber, children);
}

// 更新class组件，构建fiber
function updateClassComponent(fiber) {
  const {type, props} = fiber;
  const cmp = new type(props);
  const children = [cmp.render()];
  reconcilerChildren(fiber, children);
}

// 原生标签，，构建fiber
function updateHostComponent(fiber) {
  if (!fiber.node) {
    fiber.node = createNode(fiber);
  }
  const {children} = fiber.props;
  reconcilerChildren(fiber, children);
}

// 执行当前任务，指定下一个任务，具体逻辑看下面实现及注释
function performUnitOfWork(fiber) {
  // 执行当前子任务
  // todo
  const {type} = fiber;
  if (typeof type === "function") {
    console.log("ooooo"); //sy-log
    type.isReactComponent
      ? updateClassComponent(fiber)
      : updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }
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

// 看函数里具体注释
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
    commitRoot();
  }
  // 提交
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

// 提交
function commitRoot() {
  commitWorker(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

// 提交具体的fiber执行
function commitWorker(fiber) {
  if (!fiber) {
    return;
  }

  // 向上查找
  let parentNodeFiber = fiber.parent;
  while (!parentNodeFiber.node) {
    parentNodeFiber = parentNodeFiber.parent;
  }
  const parentNode = parentNodeFiber.node;
  // 更新 删除 新增
  if (fiber.effectTag === PLACEMENT && fiber.node !== null) {
    parentNode.appendChild(fiber.node);
  }
  commitWorker(fiber.child);
  commitWorker(fiber.sibling);
}

export default {
  render
};
