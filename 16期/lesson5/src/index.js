import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./static/js/flexible";
import "./static/style/iconfont/iconfont.css";
import {Provider} from "react-redux";
import store from "./store/";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
