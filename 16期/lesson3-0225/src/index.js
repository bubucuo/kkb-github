import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {Provider} from "react-redux";
// import {Provider} from "./kReactRedux";

import store from "./store/";

// 把store放在最顶层
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
