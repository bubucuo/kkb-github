import {createStore, combineReducers} from "redux";

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

const store = createStore(combineReducers({user: loginReducer}));

export default store;
