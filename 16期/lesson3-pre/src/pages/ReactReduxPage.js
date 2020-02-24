import React, {Component} from "react";
import {connect} from "react-redux";
// import {bindActionCreators} from "redux";
import {bindActionCreators} from "../kReactRedux";

// connect帮助组件获得store，hoc，返回了一个新的组件
export default connect(
  // mapStateToProps Function 把state映射到了props上
  state => ({count: state}),
  // mapDispatchToProps Object/Function 不定义，默认注入dispatch
  // {
  //   add: () => ({type: "ADD"})
  // }
  dispatch => {
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
            add - use dispatch
          </button>
          <button onClick={add}>add</button>
          <button onClick={minus}>minus</button>
        </div>
      );
    }
  }
);
