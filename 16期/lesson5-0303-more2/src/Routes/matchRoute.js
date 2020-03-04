const matchRoute = (routes, currentLocation) => {
  for (let i = 0; i < routes.length; i++) {
    let item = routes[i];
    if (item.path === currentLocation.pathname) {
      return item;
    }
  }
  return null; //没找到
};

export default matchRoute;
