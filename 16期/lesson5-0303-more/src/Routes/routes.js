import HomePage from "../pages/HomePage/";
import LoginPage from "../pages/LoginPage/";
import UserPage from "../pages/UserPage/";
import _404 from "../pages/_404/";
import PrivateRoute from "./PrivateRoute";

const routes = [
  {
    path: "/",
    title: "首页",
    showTabBar: true, //默认显示
    props: {exact: true},
    component: HomePage
  },
  {
    path: "/login",
    title: "登录",
    component: LoginPage
  },
  {
    path: "/user",
    title: "用户中心",
    component: UserPage,
    guard: PrivateRoute
  },
  {
    path: "",
    title: "404",
    component: _404
  }
];

export default routes;
