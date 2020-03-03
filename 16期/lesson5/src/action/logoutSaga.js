// 调用异步操作 call、
// 状态更新 （dispatch） put
// 做监听 take

import {call, fork, put, take, takeEvery} from "redux-saga/effects";
import LogoutService from "../service/logout";

// worker saga
function* logoutHandle(action) {
  // 调用异步操作 call
  yield put({type: "LOGOUT_REQUEST"});
  try {
    const res1 = yield call(LogoutService.logout, action.payload);
    yield put({type: "LOGOUT_SUCCESS", payload: res1});
  } catch (err) {
    yield put({type: "LOGOUT_FAILURE", payload: err});
  }
}

// watcher saga
function* logoutSaga() {
  yield takeEvery("logoutSaga", logoutHandle);
}

export default logoutSaga;
