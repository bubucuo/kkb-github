import React, {Component, useCallback} from "react";
import {Redirect} from "react-router-dom";
import {connect, useSelector, useDispatch} from "react-redux";
// import {connect} from "../kReactRedux";

// export default connect(
//   // mapStateToProps
//   ({user}) => {
//     console.log("login-omg"); //sy-log
//     return {isLogin: user.isLogin};
//   },
//   // mapDispatchToProps
//   {
//     login: () => ({type: "LOGIN_SUCCESS"})
//   }
// )(
//   class LoginPage extends Component {
//     render() {
//       const {isLogin, login, location} = this.props;
//       const {redirect = "/"} = location.state || {};
//       if (isLogin) {
//         // 已经登录
//         return <Redirect to={redirect} />;
//       } else {
//         return (
//           <div>
//             <h3>LoginPage</h3>
//             <button onClick={login}>login click</button>
//           </div>
//         );
//       }
//     }
//   }
// );

export default function LoginPage(props) {
  const isLogin = useSelector(state => state.user.isLogin);
  const dispatch = useDispatch();
  const login = useCallback(() => dispatch({type: "LOGIN_SUCCESS"}), []);
  const {location} = props;
  const {redirect = "/"} = location.state || {};
  if (isLogin) {
    // 已经登录
    return <Redirect to={redirect} />;
  } else {
    return (
      <div>
        <h3>LoginPage</h3>
        <button onClick={login}>login click</button>
      </div>
    );
  }
}
