import {UPDATE, PLACEMENT} from "./CONSTS";

// 下一个单元任务
let nextUnitOfWork = null;
// work in progress 工作中的fiber root
let wipRoot = null;
// 现在的根节点
let currentRoot = null;

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
  updateNode(node, {}, props);
  return node;
}

function reconcilerChildren(workInProgressFiber, children) {
  // 构建fiber结构
  // 这里的构建是按照顺序的，没有考虑移动位置等等
  // 更新 删除 新增
  let oldFiber = workInProgressFiber.base && workInProgressFiber.base.child;
  let prevSibling = null;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    let newFiber = null;
    const sameType = oldFiber && child && oldFiber.type === child.type;
    if (sameType) {
      // 类型一样
      // update
      newFiber = {
        type: oldFiber.type,
        props: child.props,
        node: oldFiber.node,
        base: oldFiber,
        parent: workInProgressFiber,
        effectTag: UPDATE
      };
    } else if (child) {
      //  新元素存在
      newFiber = {
        type: child.type,
        props: child.props,
        node: null,
        base: null,
        parent: workInProgressFiber,
        effectTag: PLACEMENT
      };
    }
    // todo 删除
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    // 形成链表结构
    if (i === 0) {
      workInProgressFiber.child = newFiber;
    } else {
      // i>0
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
  }
  // fiber结构构建 done
}

// 更新节点上属性，如className、nodeValue等
function updateNode(node, preVal, nextVal) {
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

function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = [];
  const {type, props} = fiber;
  const children = [type(props)];
  reconcilerChildren(fiber, children);
}

function updateClassComponent(fiber) {
  const {type, props} = fiber;
  const cmp = new type(props); //实例化
  const children = [cmp.render()];
  reconcilerChildren(fiber, children);
}

function updateHostComponent(fiber) {
  if (!fiber.node) {
    fiber.node = createNode(fiber);
  }
  const {children} = fiber.props;
  reconcilerChildren(fiber, children);
}

function updateFragmentComponent(fiber) {
  const {children} = fiber.props;
  reconcilerChildren(fiber, children);
}

function performUnitOfWork(fiber) {
  // 1. 执行当前任务
  // 更新当前
  const {type} = fiber;
  if (typeof type === "function") {
    type.isReactComponent
      ? updateClassComponent(fiber)
      : updateFunctionComponent(fiber);
  } else if (type) {
    updateHostComponent(fiber);
  } else {
    updateFragmentComponent(fiber);
  }

  // 2.返回再下一个任务
  // 找下个任务的原则：先找子元素
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

// 调度diff或者是渲染任务
function workLoop(deadline) {
  // 有下一个任务，并且当前帧还没有结束
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (!nextUnitOfWork && wipRoot) {
    // 提交
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function commitRoot() {
  commitWorker(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

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
  if (fiber.effectTag === PLACEMENT && fiber.node !== null) {
    parentNode.appendChild(fiber.node);
  } else if (fiber.effectTag === UPDATE && fiber.node !== null) {
    updateNode(fiber.node, fiber.base.props, fiber.props);
    parentNode.appendChild(fiber.node);
  }
  commitWorker(fiber.child);
  commitWorker(fiber.sibling);
}

// 正在工作的fiber
let wipFiber = null;
let hookIndex = null;
export function useState(init) {
  // 第一次进来用init赋值
  let oldHook = wipFiber.base && wipFiber.base.hooks[hookIndex];
  const hook = {state: oldHook ? oldHook.state : init, queue: []};
  const actions = oldHook ? oldHook.queue : [];
  actions.forEach(action => (hook.state = action));
  const setState = action => {
    hook.queue.push(action);
    wipRoot = {
      node: currentRoot.node,
      props: currentRoot.props,
      base: currentRoot
    };
    nextUnitOfWork = wipRoot;
  };
  wipFiber.hooks.push(hook);
  hookIndex++;
  // 下一次进来就要更新了
  return [hook.state, setState];
}

export default {
  render
};
