import {createStore, combineReducers} from "redux";

// 定义修改规则
function countReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + action.payload;
    case "MINUS":
      return state - action.payload;
    default:
      return state;
  }
}

const store = createStore(
  combineReducers({
    count: countReducer
  })
);

export default store;
