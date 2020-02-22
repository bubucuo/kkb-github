import React from "react";
import HocPage from "./pages/HocPage";
import FormPage from "./pages/FormPage";
import FormPage2 from "./pages/FormPage2";
import MyFormPage from "./pages/MyFormPage";
import DialogPage from "./pages/DialogPage";

function App() {
  return (
    <div className="App">
      {/* 高阶组件 */}
      {/* <HocPage /> */}

      {/* 表单组件 */}
      {/* <FormPage /> */}

      {/* 表单组件 使用create */}
      {/* <FormPage2 /> */}

      {/* 自己实现一个create */}
      {/* <MyFormPage /> */}

      {/*  弹窗*/}
      <DialogPage />
    </div>
  );
}

export default App;
