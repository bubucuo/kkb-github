// 定义修改规则 登录
const initalUserInfo = {
  isLogin: false,
  loading: false,
  userInfo: {
    id: null,
    name: null
  },
  err: {}
};
export function userReducer(state = {...initalUserInfo}, action) {
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
