import {createStore, combineReducers, applyMiddleware} from "redux";
// import thunk from "redux-thunk";
import {userReducer} from "./userReducer";
import createSagaMiddleware from "redux-saga";
import userSaga from "../action/userSaga";
import rootSaga from "../action/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({user: userReducer}),
  applyMiddleware(sagaMiddleware)
  // applyMiddleware(thunk)
);

sagaMiddleware.run(rootSaga);

export default store;
