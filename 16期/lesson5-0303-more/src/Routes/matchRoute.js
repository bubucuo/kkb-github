import allRoutes, {basicRoutes, blankRoutes} from "./routes";

function getAllRoutes() {
  let a = [];
  for (let i = 0; i < allRoutes.length; i++) {
    a = a.concat(allRoutes[i].routes);
  }
  return a;
}
export const matchAllRoute = currentLocation => {
  const allRoutes = getAllRoutes();
  console.log("allll", allRoutes); //sy-log
  for (let i = 0; i < allRoutes.length; i++) {
    let item = allRoutes[i];
    if (item.path === currentLocation.pathname) {
      return item;
    }
  }
  return null; //没找到
};

export const matchRoute = (routes, currentLocation) => {
  for (let i = 0; i < routes.length; i++) {
    let item = routes[i];
    if (item.path === currentLocation.pathname) {
      return item;
    }
  }
  return null; //没找到
};
