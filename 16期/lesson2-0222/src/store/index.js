import {createStore, applyMiddleware} from "redux";
// import {createStore, applyMiddleware} from "../kRedux";

import thunk from "redux-thunk";
import logger from "redux-logger";

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

// function logger() {
//   return dispatch => action => {
//     // 中间件任务
//     console.log(action.type + "执行了！"); //sy-log
//     return dispatch(action);
//   };
// }

// function thunk({getState}) {
//   return dispatch => action => {
//     if (typeof action === "function") {
//       action(dispatch, getState);
//     } else {
//       dispatch(action);
//     }
//   };
// }
