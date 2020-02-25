import React, {useState} from "react";
import ReactReduxPage from "./pages/ReactReduxPage";
import RouterPage from "./pages/RouterPage";
import RouteChildrenPage from "./pages/RouteChildrenPage";
import RouteRenderPage from "./pages/RouteRenderPage";
import RouteComponePage from "./pages/RouteComponePage";

function App() {
  // const [num, setNum] = useState(0);
  return (
    <div className="App">
      {/* <button onClick={() => setNum(num + 1)}>click</button> */}
      {/* react redux 学习 */}
      {/* <ReactReduxPage num={num} /> */}

      {/* Router 学习 */}
      <RouterPage />
      {/* <RouteChildrenPage /> */}
      {/* <RouteRenderPage /> */}

      {/* 比较Route的 component与render */}
      {/* <RouteComponePage /> */}
    </div>
  );
}

export default App;
