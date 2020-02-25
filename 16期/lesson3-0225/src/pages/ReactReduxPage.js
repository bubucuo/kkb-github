import React, {Component} from "react";
// import {connect} from "react-redux";
import {connect} from "../kReactRedux";

import {bindActionCreators} from "redux";

// connect 链接store与组件 其实这里返回的是一个新的组件  hoc
export default connect(
  // mapStateToProps Function (state, [ownProps])
  state => ({count: state}),
  // ownProps是组件本身的props
  // ! ownProps谨慎使用，如果ownProps发生变化的话，mapStateToProps会被重新执行，
  // ! state也会被重新计算，这个时候影响性能
  // (state, ownProps) => {
  //   console.log("ownProps", ownProps); //sy-log
  //   return {
  //     count: state
  //   };
  // }

  // mapDispatchToProps Object/Function
  // 如果不指定mapDispatchToProps， 默认props会被注入dispatch本身
  // object ，dispatch本身不会被注入props
  // {
  //   add: () => ({type: "ADD"})
  // }
  // function (dispatch, [ownProps])
  // ! ownProps谨慎使用，如果ownProps发生变化的话，mapDispatchToProps会被重新执行，
  // ! 这个时候影响性能
  (dispatch, ownProps) => {
    console.log("ownProps", ownProps); //sy-log
    let res = {
      add: () => ({type: "ADD"}),
      minus: () => ({type: "MINUS"})
    };
    res = bindActionCreators(res, dispatch);
    return {
      dispatch,
      ...res
    };
  }
  //mergeProps
  // (stateProps, dispatchProps, ownProps) => {
  //   return {omg: "omg", ...stateProps, ...dispatchProps, ...ownProps};
  // }
)(
  class ReactReduxPage extends Component {
    render() {
      console.log("props", this.props); //sy-log
      const {count, dispatch, add, minus} = this.props;
      return (
        <div>
          <h3>ReactReduxPage</h3>
          <p>{count}</p>
          <button onClick={() => dispatch({type: "ADD"})}>
            add use dispatch
          </button>
          <button onClick={add}>add</button>
          <button onClick={minus}>minus</button>
        </div>
      );
    }
  }
);
