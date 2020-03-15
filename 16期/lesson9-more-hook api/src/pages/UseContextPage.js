import React, {useState, useEffect, useContext} from "react";
import {MyContext} from "../AppContext";

export default function UseContextPage(props) {
  const ctx = useContext(MyContext);
  console.log("ctx", ctx); //sy-log
  return (
    <div className={ctx.themeColor}>
      <h3>UseContextPage</h3>
    </div>
  );
}
