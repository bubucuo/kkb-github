import LoginService from "../service/login";

// async await
// const res1 =  ajax1
// ajax2(res1)

//async原理也是generator，但是比generator简单
export async function loginAction(dispatch, userInfo) {
  dispatch({type: "LOGIN_REQUEST"});
  const res1 = await login(dispatch, userInfo);
  getMoreUserInfo(dispatch, res1);
}

// export function loginAction(dispatch, userInfo) {
//   dispatch({type: "LOGIN_REQUEST"});
//   // setTimeout(() => {
//   //   dispatch({type: "LOGIN_SUCCESS", payload: userInfo});
//   // }, 1000);
//   login(dispatch, userInfo);
// }

function login(dispatch, userInfo) {
  return LoginService.login(userInfo).then(
    res => {
      return res;
      // dispatch({type: "LOGIN_SUCCESS", payload: res});
      // getMoreUserInfo(dispatch, res);
    },
    err => {
      dispatch({type: "LOGIN_FAILURE", payload: err});
    }
  );
}

function getMoreUserInfo(dispatch, userInfo) {
  return LoginService.getMoreUserInfo(userInfo).then(
    res => {
      dispatch({type: "LOGIN_SUCCESS", payload: {...userInfo, ...res}});
      return res;
    },
    err => {
      dispatch({type: "LOGIN_FAILURE", payload: err});
    }
  );
}
