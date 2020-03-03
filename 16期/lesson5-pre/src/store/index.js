import {createStore, combineReducers, applyMiddleware} from "redux";
import createSagaMiddleware from "redux-saga";
import mySaga from "./mySaga";

const initalUserInfo = {
  isLogin: false,
  user: {
    name: null
  }
};

// 定义修改规则 登录
function loginReducer(state = {...initalUserInfo}, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        isLogin: true,
        user: {
          name: "xiaoming"
        }
      };
    case "LOGOUT_FAILURE":
    case "LOGOUT_SUCCESS":
      return {
        isLogin: false,
        user: {
          name: null
        }
      };

    default:
      return state;
  }
}

// 创建
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({user: loginReducer}),
  applyMiddleware(sagaMiddleware)
);

// 运行
sagaMiddleware.run(mySaga);

export default store;
