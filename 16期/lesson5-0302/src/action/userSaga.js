import {call, put, takeEvery} from "redux-saga/effects";
import {UserService, MoreUserService} from "../service/user";

// workder saga
function* loginHandle(action) {
  yield put({type: "LOGIN_REQUEST"});
  try {
    let res1 = yield call(UserService.login, action.payload);
    let res2 = yield call(MoreUserService.getMoreUserInfo, res1);

    yield put({type: "LOGIN_SUCCESS", payload: {...res1, ...res2}});
  } catch (err) {
    yield put({type: "LOGIN_FAILURE", payload: err});
  }
}

// watcher saga
function* userSaga(props) {
  yield takeEvery("login", loginHandle);
}

export default userSaga;
