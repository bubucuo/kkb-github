// import {createStore, applyMiddleware} from "redux";
import {createStore, applyMiddleware} from "../kRedux";
// import thunk from "redux-thunk";
// import logger from "redux-logger";

// 定义修改规则
function countReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(countReducer, applyMiddleware(thunk, logger));

export default store;

function logger({getState, dispatch}) {
  return dispatch => action => {
    console.log(action.type + "执行了"); //sy-log
    return dispatch(action);
  };
}

function thunk({getState, dispatch}) {
  return dispatch => action => {
    // action 可以是对象 还可以是函数 ，那不同的形式，操作也不同
    if (typeof action === "function") {
      return action(dispatch, getState);
    } else {
      return dispatch(action);
    }
  };
}
