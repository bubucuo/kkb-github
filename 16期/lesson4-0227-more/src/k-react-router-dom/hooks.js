import React from "react";
import {RouterContext} from "./RouterContext";

// useContext取到的value来自最近的Provider
export function useParams() {
  const match = React.useContext(RouterContext).match;
  return match ? match.params : {};
}

export function useHistory() {
  return React.useContext(RouterContext).history;
}

export function useLocation() {
  return React.useContext(RouterContext).location;
}
