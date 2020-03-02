import {UserService, MoreUserService} from "../service/user";

export async function loginAction(dispatch, userInfo) {
  const res = await goLogin(dispatch, userInfo);
  console.log("res", res); //sy-log
  await getMoreInfo(dispatch, {...userInfo, ...res});
}

export function goLogin(dispatch, userInfo) {
  //loading
  dispatch({type: "LOGIN_REQUEST"});
  return UserService.login(userInfo).then(
    res => {
      return res;
    },
    err => {
      dispatch({type: "LOGIN_FAILURE", payload: err});
    }
  );
}

function getMoreInfo(dispatch, userInfo) {
  return MoreUserService.getMoreUserInfo(userInfo).then(
    res => {
      dispatch({type: "LOGIN_SUCCESS", payload: {...userInfo, ...res}});
      return res;
    },
    err => {
      //处理异常
      dispatch({type: "LOGIN_FAILURE", payload: err});
    }
  );
}
