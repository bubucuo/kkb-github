import React, {
  Component,
  useContext,
  useReducer,
  useEffect,
  useLayoutEffect,
  useMemo
} from "react";
// import {bindActionCreators} from "redux";

const ValueContext = React.createContext();

// export const connect = (
//   mapStateToProps = state => state,
//   mapDispatchToProps
// ) => WrappedComponent => {
//   return class extends Component {
//     // 此时组件的所有生命周期都能获得this.context
//     static contextType = ValueContext;
//     constructor(props, context) {
//       super(props);
//       this.stateProps = {};
//       this.dispatchProps = {};
//       this.update(context);
//     }
//     componentDidMount() {
//       const {subscribe} = this.context;
//       // this.update();
//       // 订阅
//       this.unsubscribe = subscribe(() => {
//         this.update();
//         this.forceUpdate();
//       });
//     }

//     componentWillUnmount() {
//       if (this.unsubscribe) {
//         this.unsubscribe();
//       }
//     }

//     update = context => {
//       const {getState, dispatch, subscribe} = context || this.context;
//       //  getState获取当前store的state
//       this.stateProps = mapStateToProps(getState());
//       // mapDispatchToProps Object/Function
//       if (typeof mapDispatchToProps === "object") {
//         this.dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
//       } else if (typeof mapDispatchToProps === "function") {
//         this.dispatchProps = mapDispatchToProps(dispatch, this.props);
//       } else {
//         // 默认
//         this.dispatchProps = {dispatch};
//       }
//     };
//     render() {
//       return (
//         <WrappedComponent
//           {...this.props}
//           {...this.stateProps}
//           {...this.dispatchProps}
//         />
//       );
//     }
//   };
// };

export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps
) => WrappedComponent => props => {
  const store = useContext(ValueContext);
  const {getState, dispatch, subscribe} = store;

  const stateProps = useMemo(() => mapStateToProps(getState()), [
    store.getState()
  ]);
  const dispatchProps = useMemo(
    () => bindActionCreators(mapDispatchToProps, dispatch),
    [store]
  );

  const [, forceUpdate] = useReducer(null);
  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => {
      forceUpdate();
    });
    return () => {
      unsubscribe();
    };
  }, [store]);
  console.log("omg"); //sy-log
  return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
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
  console.log("bindActionCreators"); //sy-log
  const obj = {};
  for (const key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }
  return obj;
}
