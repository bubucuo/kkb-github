import React, {Component} from "react";

const ValueContext = React.createContext();

export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps = {}
) => WarpComponent => {
  return class extends Component {
    static contextType = ValueContext;
    constructor(props) {
      super(props);
      this.state = {props: {}};
    }
    componentDidMount() {
      this.update();
      const {subscribe} = this.context;

      subscribe(() => {
        this.update();
      });
    }
    update() {
      const {getState, subscribe, dispatch} = this.context;
      const stateProps = mapStateToProps(getState());
      let dispatchProps;
      if (mapDispatchToProps) {
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
      } else {
        dispatchProps = {dispatch};
      }
      this.setState({
        props: {
          ...this.state.props,
          ...stateProps,
          ...dispatchProps
        }
      });
    }
    render() {
      return <WarpComponent {...this.props} {...this.state.props} />;
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

// 给mapDispatchToProps绑定上dispatch去 实现
function bindActionCreators(creators, dispatch) {
  // {add:()=>({type:'add'})}
  // {add:(...args) => dispatch(creator(...args))}
  return Object.keys(creators).reduce((ret, item) => {
    ret[item] = bindActionCreator(creators[item], dispatch);
    return ret;
  }, {});
}
