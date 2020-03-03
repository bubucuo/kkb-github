import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import {userReducer} from "./userReducer";
import loginSaga from "../action/loginSaga";
import rootSaga from "../action/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({user: userReducer}),
  // applyMiddleware(thunk)
  applyMiddleware(sagaMiddleware)
);
// sagaMiddleware.run(loginSaga);
sagaMiddleware.run(rootSaga);

export default store;
