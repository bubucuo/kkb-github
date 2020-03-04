import HomePage from "../pages/HomePage/";
import LoginPage from "../pages/LoginPage/";
import UserPage from "../pages/UserPage/";
import CartPage from "../pages/CartPage/";
import OlistPage from "../pages/OlistPage/";
import PrivateRoute from "./PrivateRoute";
import _404 from "../pages/_404";
import BasicLayout from "../layout/BasicLayout";
import BlankLayout from "../layout/BlankLayout";

const basicRoutes = [
  {
    path: "/",
    title: "首页",
    icon: "shouye",
    _1stNav: true,
    showTopBar: false,
    showBottomBar: true,
    props: {exact: true},
    component: HomePage
  },
  {
    path: "/cart",
    icon: "fenlei",
    _1stNav: true,

    showTopBar: true,
    showBottomBar: true,
    title: "购物车",
    component: CartPage
  },
  {
    path: "/olist",
    showTopBar: true,
    icon: "icon-",
    _1stNav: true,
    showBottomBar: true,
    title: "订单列表",
    component: OlistPage
  },
  {
    path: "/user",
    title: "用户中心",
    icon: "wode",
    _1stNav: true,
    showTopBar: true,
    showBottomBar: true,
    component: UserPage,
    guard: PrivateRoute,
    shortIcon:
      "https://gw.alicdn.com/tfs/TB1OIxTcLc3T1VjSZLeXXbZsVXa-183-144.png?getAvatar=1"
  }
];

const blankRoutes = [
  {
    path: "/login",
    title: "登录",
    icon: "wode",
    component: LoginPage
  },
  {
    path: "",
    showTopBar: true,
    showBottomBar: true,
    title: "404",
    component: _404
  }
];

export {basicRoutes, blankRoutes};
export default [
  {
    layout: BasicLayout,
    routes: basicRoutes
  },
  {
    layout: BlankLayout,
    routes: blankRoutes
  }
];
