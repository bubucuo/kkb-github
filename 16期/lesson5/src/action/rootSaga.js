import {all} from "redux-saga/effects";
import loginSaga from "./loginSaga";
import logoutSaga from "./logoutSaga";

export default function* rootSaga() {
  yield all([loginSaga(), logoutSaga()]);
}
