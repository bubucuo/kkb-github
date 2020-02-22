export function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  let currentState = undefined;
  let currentListeners = [];
  function getState() {
    return currentState;
  }
  function dispatch(action) {
    currentState = reducer(currentState, action);
    // 监听函数是一个数组，那就循环吧
    currentListeners.map(listener => listener());
  }

  //订阅，可以多次订阅
  function subscribe(listener) {
    // 每次订阅，把回调放入回调数组
    currentListeners.push(listener);
  }

  // 取值的时候，注意一定要保证不和项目中的会重复
  dispatch({type: "@INIT/REDUX-KKB"});

  return {
    getState,
    dispatch,
    subscribe
  };
}

export function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args);
    let dispatch = store.dispatch;
    const middleApi = {
      getState: store.getState,
      dispatch
    };
    // 给middleware参数，比如说dispatch
    const middlewaresChain = middlewares.map(middleware =>
      middleware(middleApi)
    );
    dispatch = compose(...middlewaresChain)(dispatch);
    return {
      ...store,

      // 覆盖上面store里的dispatch
      dispatch
    };
  };
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
    // return () => {};
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
