import UserService from "../service/user";

export const loginAction = (dispatch, userInfo) => {
  //loading
  dispatch({type: "LOGIN_REQUEST"});
  UserService.login(userInfo).then(
    res => {
      dispatch({type: "LOGIN_SUCCESS", payload: res});
    },
    err => {
      dispatch({type: "LOGIN_FAILURE", payload: err});
    }
  );
};
