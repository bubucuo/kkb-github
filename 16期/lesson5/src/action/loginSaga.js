// 调用异步操作 call、
// 状态更新 （dispatch） put
// 做监听 take

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
  // 调用异步操作 call
  yield put({type: "LOGIN_REQUEST"});
  try {
    const res1 = yield call(LoginService.login, action.payload);
    const res2 = yield call(LoginService.getMoreUserInfo, res1);
    yield put({type: "LOGIN_SUCCESS", payload: {...res1, ...res2}});
  } catch (err) {
    yield put({type: "LOGIN_FAILURE", payload: err});
  }
}

// watcher saga

function* loginSaga() {
  console.log("哦哦哦"); //sy-log

  while (true) {
    const action = yield take("loginSaga");
    // call 是一个会阻塞的 Effect。即 Generator 在调用结束之前不能执行或处理任何其他事情。
    // yield call(loginHandle, action);
    // console.log("loginSaga-res", action); //sy-log

    // fork 是无阻塞型调用,
    // 当我们 fork 一个 任务，任务会在后台启动，调用者也可以继续它自己的流程，而不用等待被 fork 的任务结束。
    yield fork(loginHandle, action);
    console.log("loginSaga-res", action); //sy-log
  }

  // yield takeEvery("loginSaga", loginHandle);
  // console.log("takeEvery"); //sy-log
}

export default loginSaga;

const takeEvery = (pattern, saga, ...args) =>
  fork(function*() {
    while (true) {
      const action = yield take(pattern);
      yield fork(saga, ...args.concat(action));
    }
  });
