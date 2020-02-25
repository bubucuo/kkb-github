import React, {Component} from "react";

const ValueContext = React.createContext();

// connect
export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps
) => WrappedComponent => {
  return class extends Component {
    static contextType = ValueContext;
    constructor(props) {
      super(props);
      this.state = {
        props: {}
      };
    }
    componentDidMount() {
      this.update();
      const {subscribe} = this.context;
      subscribe(() => {
        this.update();
      });
    }

    update = () => {
      const {getState, dispatch} = this.context;
      const stateProps = mapStateToProps(getState());
      let dispatchProps;
      console.log("mapDispatchToProps", mapDispatchToProps); //sy-log
      if (typeof mapDispatchToProps === "object") {
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
      } else if (typeof mapDispatchToProps === "function") {
        dispatchProps = mapDispatchToProps(dispatch, this.props);
      } else {
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
      return <WrappedComponent {...this.props} {...this.state.props} />;
    }
  };
};

// Provider
//  /context
export class Provider extends Component {
  render() {
    return (
      <ValueContext.Provider value={this.props.store}>
        {this.props.children}
      </ValueContext.Provider>
    );
  }
}

// let creators = {
//   add: () => ({type: "ADD"}),
//   minus: () => ({type: "MINUS"})
// };

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}

// dispatch(add())
export function bindActionCreators(creators, dispatch) {
  return Object.keys(creators).reduce((ret, item) => {
    ret[item] = bindActionCreator(creators[item], dispatch);
    return ret;
  }, {});
}
