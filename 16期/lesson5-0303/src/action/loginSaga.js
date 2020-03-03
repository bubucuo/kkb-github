// 调用异步操作 阻塞call，用于顺序执行
// 不阻塞 fork
// 状态更新 （dispatch） put
// 做监听 takeEvery take

import {
  call,
  fork,
  put,
  take
  // takeEvery
} from "redux-saga/effects";
import LoginService from "../service/login";

// worker saga
function* loginHandle(action) {
  console.log("action", action); //sy-log
  yield put({type: "LOGIN_REQUEST"}); //展示loading
  try {
    const res1 = yield call(LoginService.login, action.payload);
    // console.log("res1", res1); //sy-log
    const res2 = yield call(LoginService.getMoreUserInfo, res1);
    yield put({type: "LOGIN_SUCCESS", payload: {...res2, ...res1}});
  } catch (err) {
    yield put({type: "LOGIN_FAILURE", payload: err});
  }
}

// watcher saga
function* loginSaga(params) {
  yield takeEvery("loginSaga", loginHandle);
  // const action = yield take("loginSaga");
  // yield fork(loginHandle, action);
  // console.log("res", action); //sy-log
}

export default loginSaga;

const takeEvery = (pattern, saga, ...args) =>
  fork(function*() {
    while (true) {
      const action = yield take(pattern);
      yield fork(saga, ...args.concat(action));
    }
  });
