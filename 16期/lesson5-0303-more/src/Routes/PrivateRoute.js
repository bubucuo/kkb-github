import React, {useState, useEffect} from "react";
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";

export default connect(
  //mapStateToProps
  ({user}) => ({
    isLogin: user.isLogin
  })
)(function PrivateRoute({children, isLogin, ...rest}) {
  return (
    <Route
      {...rest}
      render={({location}) =>
        isLogin ? (
          children
        ) : (
          <Redirect
            to={{pathname: "/login", state: {redirect: location.pathname}}}
          />
        )
      }
    />
  );
});
