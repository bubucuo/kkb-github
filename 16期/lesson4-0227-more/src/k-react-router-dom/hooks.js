import React from "react";
import {RouterContext} from "./RouterContext";

// 获取match的params
// 接收的是最近的Provider提供的value
export function useParams() {
  return React.useContext(RouterContext).match.params;
}

//获取history

export function useHistory() {
  return React.useContext(RouterContext).history;
}

export function useLocation() {
  return React.useContext(RouterContext).location;
}
