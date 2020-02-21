import {createStore, applyMiddleware} from "redux";
// import {createStore} from "../kRedux";
import thunk from "redux-thunk";
import logger from "redux-logger";

function countReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(countReducer, applyMiddleware(logger, thunk));

export default store;
