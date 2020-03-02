import {UserService, MoreUserService} from "../service/user";

export const loginAction = (dispatch, userInfo) => {
  //loading
  dispatch({type: "LOGIN_REQUEST"});
  UserService.login(userInfo).then(
    res => {
      // dispatch({type: "LOGIN_SUCCESS", payload: res});
      moreInfoAction(dispatch, {...userInfo, ...res});
    },
    err => {
      dispatch({type: "LOGIN_FAILURE", payload: err});
    }
  );
};

const moreInfoAction = (dispatch, userInfo) => {
  MoreUserService.getMoreUserInfo(userInfo).then(
    res => {
      dispatch({type: "LOGIN_SUCCESS", payload: {...userInfo, ...res}});
    },
    err => {
      //处理异常
    }
  );
};
