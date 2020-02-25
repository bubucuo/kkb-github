import React, {Component} from "react";
// import {bindActionCreators} from "redux";

const ValueContext = React.createContext();

export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps
) => WrappedComponent => {
  return class extends Component {
    // 此时组件的所有生命周期都能获得this.context
    static contextType = ValueContext;
    constructor(props) {
      super(props);
      this.state = {
        props: {}
      };
    }
    componentDidMount() {
      const {subscribe} = this.context;
      this.update();
      // 订阅
      subscribe(() => {
        this.update();
      });
    }

    update = () => {
      const {getState, dispatch, subscribe} = this.context;
      //  getState获取当前store的state
      let stateProps = mapStateToProps(getState());
      let dispatchProps;
      // mapDispatchToProps Object/Function
      if (typeof mapDispatchToProps === "object") {
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
      } else if (typeof mapDispatchToProps === "function") {
        dispatchProps = mapDispatchToProps(dispatch, this.props);
      } else {
        // 默认
        dispatchProps = {dispatch};
      }
      this.setState({
        props: {
          ...stateProps,
          ...dispatchProps
        }
      });
    };
    render() {
      console.log("this.context", this.context); //sy-log
      return <WrappedComponent {...this.state.props} />;
    }
  };
};

export class Provider extends Component {
  render() {
    return (
      <ValueContext.Provider value={this.props.store}>
        {this.props.children}
      </ValueContext.Provider>
    );
  }
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}

// {
//     add: () => ({type: "ADD"})
//   }
export function bindActionCreators(creators, dispatch) {
  const obj = {};
  for (const key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }
  return obj;
}
