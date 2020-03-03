// redux-saga是一个用于管理应用程序的副作用的库，类比redux-thunk
// 监听 takeEvery
// 调用异步操作 call
// 状态更新 （dispatch） put

import {call, put, takeEvery} from "redux-saga/effects";
import {UserService} from "../service/user";

// worker saga
function* loginHandle(action) {
  const res = yield call(UserService.login, {name: "小明"});
  console.log("action1", res);
  const res2 = yield call(UserService.login, {name: "小明"});
  console.log("action2", res);
  yield put({type: "LOGIN_SUCCESS"});
}

// watcher saga
function* mySaga(props) {
  yield takeEvery("login", loginHandle);
}

export default mySaga;
