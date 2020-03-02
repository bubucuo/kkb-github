import {UserService, MoreUserService} from "../service/user";

export const loginAction = (dispatch, userInfo) => {
  //loading
  dispatch({type: "LOGIN_REQUEST"});
  UserService.login(userInfo).then(
    res => {
      // dispatch({type: "LOGIN_SUCCESS", payload: res});
      MoreUserService.getMoreUserInfo(res).then(
        moreRes => {
          dispatch({type: "LOGIN_SUCCESS", payload: {...res, ...moreRes}});
        },
        err => {
          //处理异常
        }
      );
    },
    err => {
      dispatch({type: "LOGIN_FAILURE", payload: err});
    }
  );
};
