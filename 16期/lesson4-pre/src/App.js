import React from "react";
// import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {BrowserRouter as Router, Route, Link} from "./kReactRouter";

import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/home">首页</Link>
        <Link to="user">用户中心</Link>

        <Route path="/home" component={HomePage} />
        <Route path="/user" component={UserPage} />
      </Router>
    </div>
  );
}

export default App;
