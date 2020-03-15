import React from "react";
import UseReducerPage from "./pages/UseReducerPage";
import UseContextPage from "./pages/UseContextPage";
import {MyContext} from "./AppContext";
import UseRefPage from "./pages/UseRefPage";

function App() {
  return (
    <div className="App">
      {/* <MyContext.Provider value={{themeColor: "red"}}>
        <UseContextPage />
      </MyContext.Provider> */}

      {/* <UseReducerPage /> */}
      <UseRefPage />
    </div>
  );
}

export default App;
