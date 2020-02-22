export function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  // 当前状态
  let currentState = undefined;
  // 回调
  let currentListeners = [];
  function getState() {
    return currentState;
  }
  function dispatch(action) {
    currentState = reducer(currentState, action);
    currentListeners.map(listener => listener());
  }
  function subscribe(listener) {
    currentListeners.push(listener);
  }

  dispatch({type: "@@INIT/REDUX-kkb"});

  return {
    getState,
    dispatch,
    subscribe
  };
}

export function applyMiddleware(...middlewares) {
  //返回的是强化以后的函数
  return createStore => (...args) => {
    const store = createStore(...args);
    let dispatch = store.dispatch; //初始的dispatch
    const middleApi = {
      getState: store.getState,
      dispatch //: (...args) => dispatch(...args)
    };
    const middlewaresChain = middlewares.map(middleware =>
      middleware(middleApi)
    );
    // 聚合
    dispatch = compose(...middlewaresChain)(dispatch); //加强版的dispatch，这个dispatch可以接受回调和object

    return {...store, dispatch};
  };
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
