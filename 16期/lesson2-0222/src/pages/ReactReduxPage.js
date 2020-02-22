import React, {Component} from "react";
// import {connect} from "react-redux";
import {connect} from "../kreactRedux";

export default connect(
  // mapStateToProps
  state => ({count: state}),
  // mapDispatchToProps
  {add: () => ({type: "ADD"})}
)(
  class ReactReduxPage extends Component {
    render() {
      console.log("props", this.props); //sy-log
      const {count, dispatch, add} = this.props;
      return (
        <div>
          <h3>ReactReduxPage</h3>
          <p>{count}</p>
          {/* <button onClick={() => dispatch({type: "ADD"})}>add</button> */}
          <button onClick={add}>add</button>

          {/* <button onClick={this.asyAdd}>asyAdd</button> */}
        </div>
      );
    }
  }
);
