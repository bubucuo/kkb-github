import {createStore, combineReducers} from "redux";

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

const initalUserInfo = {
  isLogin: false,
  user: {
    name: "小明"
  }
};
function loginReducer(state = {...initalUserInfo}, action) {
  switch (action.type) {
    case "getUserInfo":
      return {...initalUserInfo};
    case "loginSuccess":
      return {...state, isLogin: true};
    case "loginFailure":
      return {...state, isLogin: true};
    default:
      return {...state};
  }
}

// const store = createStore(countReducer);

const store = createStore(combineReducers({user: loginReducer}));

export default store;
