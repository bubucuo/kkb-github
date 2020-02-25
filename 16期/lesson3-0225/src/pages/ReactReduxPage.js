import React, {Component} from "react";
// import {connect} from "react-redux";
// import {bindActionCreators} from "redux";
import {bindActionCreators, connect} from "../kReactRedux";

// connect用于连接React组件与store， 返回一个新的已经与store连接的组件类（HOC）
export default connect(
  // mapStateToProps Fucntion
  // !慎重定义ownProps，因为你一旦定义ownProps，那么每当ownProps发生改变的时候，当前的mapStateToProps都会被调用，
  // !这里的state也会被重新计算，容易影响性能
  state => {
    // console.log("mapStateToProps"); //sy-log
    return {
      count: state
    };
  },
  // mapDispatchToProps Object Fucntion
  // Object 此时props中没有dispacth，但是有action creators，内部实现dispatch
  // {
  //   add: () => ({type: "ADD"}),
  //   minus: () => ({type: "MINUS"})
  // }
  // Fucntion 参数是dispatch与ownProps
  // !慎重定义ownProps，因为你一旦定义ownProps，那么每当ownProps发生改变的时候，当前的mapStateToProps都会被调用，容易影响性能
  (dispatch, ownProps) => {
    console.log("mapDispatchToProps--", ownProps); //sy-log
    let creators = {
      add: () => ({type: "ADD"}),
      minus: () => ({type: "MINUS"})
    };
    creators = bindActionCreators(creators, dispatch);
    return {dispatch, ...creators};
  }
)(
  class ReactReduxPage extends Component {
    add = () => {
      this.props.dispatch({type: "ADD"});
    };
    render() {
      console.log("props", this.props); //sy-log
      const {count, dispatch, add, minus} = this.props;
      return (
        <div>
          <h3>ReactReduxPage</h3>
          <p>omg:{count}</p>
          <button onClick={this.add}>add-use dispatch</button>
          <button onClick={add}>add</button>
          <button onClick={minus}>minus</button>
        </div>
      );
    }
  }
);
