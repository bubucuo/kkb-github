import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";

const initalUserInfo = {
  isLogin: false,
  loading: false,
  userInfo: {
    name: null
  },
  err: {}
};

// 定义修改规则 登录
function loginReducer(state = {...initalUserInfo}, action) {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true
      };
    case "LOGIN_SUCCESS":
      return {
        isLogin: true,
        loading: false,
        userInfo: action.payload
      };
    case "LOGIN_FAILURE":
      console.log("action", action.payload); //sy-log
      return {
        ...state,
        ...initalUserInfo,
        err: action.payload
      };
    case "LOGOUT_SUCCESS":
      return {
        isLogin: false,
        ...initalUserInfo
      };

    default:
      return state;
  }
}

const store = createStore(
  combineReducers({user: loginReducer}),
  applyMiddleware(thunk)
);

export default store;
