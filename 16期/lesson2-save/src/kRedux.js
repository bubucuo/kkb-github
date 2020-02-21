export function createStore(reducer) {
  let currentState = undefined;
  let currentListeners = [];

  function getState() {
    return currentState;
  }
  function subscribe(listener) {
    currentListeners.push(listener);
  }
  function dispatch(action) {
    currentState = reducer(currentState, action);
    currentListeners.map(v => v());
    return action;
  }

  dispatch({type: "INIT/KKB-REDUX"});
  return {getState, dispatch, subscribe};
}
