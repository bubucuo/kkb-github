import {UPDATE, PLACEMENT} from "./CONST";

// 下一个单元任务
let nextUnitOfWork = null;
// 现在工作的fiber work, in propgress fiber
let wipRoot = null;
// 现在的根节点
let currentRoot = null;
let deletions = null;
//work in propgress fiber
let wipFiber = null;
let hookIndex = null;

function render(vnode, container) {
  wipRoot = {
    node: container, //当前node
    props: {children: [vnode]},
    base: currentRoot //这里第一次渲染，现在的根节点是null
  };
  deletions = [];
  nextUnitOfWork = wipRoot; //第一次渲染，下一个单元任务就是
}

function createNode(vnode) {
  const {type, props} = vnode;
  const node =
    type === "TEXT"
      ? document.createTextNode("")
      : document.createElement(type);
  updateNode(node, {}, props);
  return node;
}

function updateNode(node, prevVal, nextVal) {
  // Object.keys(prevVal)
  //   .filter(k => k !== "children").filter(k=>k).
  //   .forEach(k => (node[k] = nextVal[k]));

  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      if (k.slice(0, 2) === "on") {
        node.addEventListener("click", nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
    });
}

function performUnitOfWork(fiber) {
  console.log("type", fiber); //sy-log

  // 更新当前
  const {type} = fiber;
  if (typeof type === "function") {
    type.isReactComponent
      ? updateClassComponent(fiber)
      : updateFunctionComponent(fiber);
  } else if (type) {
    updateHostComponent(fiber);
  } else {
    //fragment
    updateFragmentComponent(fiber);
  }

  // 找到 下一个任务
  // 原则是： 先找子元素
  if (fiber.child) {
    return fiber.child;
  }
  // 没有子元素，寻找兄弟元素
  //? 为什么不找父元素
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

function updateHostComponent(fiber) {
  // 根据当前任务获取下一个任务
  if (!fiber.node) {
    fiber.node = createNode(fiber);
  }
  const {children} = fiber.props;
  reconcilerChildren(fiber, children);
}

export function useState(init) {
  const oldHooks = wipFiber.base && wipFiber.base.hooks[hookIndex];
  const hook = {state: oldHooks ? oldHooks.state : init, queue: []};
  const actions = oldHooks ? oldHooks.queue : [];
  actions.forEach(action => {
    hook.state = action;
  });
  const setState = payload => {
    hook.queue.push(payload);
    wipRoot = {
      node: currentRoot.node,
      props: currentRoot.props,
      base: currentRoot
    };
    nextUnitOfWork = wipRoot;
  };
  wipFiber.hooks.push(hook);
  hookIndex++;

  return [hook.state, setState];
}

function updateFunctionComponent(fiber) {
  //记录下当前正在工作的fiber 并且重置hookIndex为0， hooks数组为[]
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = [];
  //

  const {type, props} = fiber;
  const children = [type(props)];
  reconcilerChildren(fiber, children);
}

function updateClassComponent(fiber) {
  const {type, props} = fiber;
  const cmp = new type(props);
  const children = [cmp.render()];
  reconcilerChildren(fiber, children);
}

function updateFragmentComponent(fiber) {
  const {type, props} = fiber;
  reconcilerChildren(fiber, props.children);
}

function reconcilerChildren(workInProgressFiber, children) {
  // 构建fiber结构
  let oldFiber = workInProgressFiber.base && workInProgressFiber.base.child;
  let prevSibling = null;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    let newFiber = null; //下面生成新的fiber
    const sameType = oldFiber && child && oldFiber.type === child.type;
    if (sameType) {
      // 类型一样  复用dom
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
      // 替换
      newFiber = {
        type: child.type,
        props: child.props,
        node: null,
        parent: workInProgressFiber,
        base: null,
        effectTag: PLACEMENT
      };
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    if (i === 0) {
      workInProgressFiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    // fiber接班结构构建完成
  }
}

// 调度diff或者是渲染任务
function workLoop(deadline) {
  // 有下一个任务，并且当前帧还没有结束
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (!nextUnitOfWork && wipRoot) {
    // 没有任务了，并且根节点还在
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
  }
  if (fiber.effectTag === UPDATE && fiber.node !== null) {
    updateNode(fiber.node, fiber.base.props, fiber.props);
    parentNode.appendChild(fiber.node);
  }
  commitWorker(fiber.child);
  commitWorker(fiber.sibling);
}

export default {render, useState};
