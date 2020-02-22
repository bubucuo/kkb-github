import React, {Component} from "react";

//HOC: 是个函数，接收一个组件，返回一个新的组件
// function Child(props) {
//   return <div>Child</div>;
// }
// Cmp这里是function或者class组件
const foo = Cmp => props => {
  return (
    <div className="border">
      <Cmp {...props} />
    </div>
  );
};
const foo2 = Cmp => props => {
  return (
    <div className="greenBorder">
      <Cmp {...props} />
    </div>
  );
};

// 从下往上
@foo2
@foo
@foo
class Child extends Component {
  render() {
    return <div>Child</div>;
  }
}

// const foo = Cmp => {
//   return props => {
//     return (
//       <div className="border">
//         <Cmp {...props} />
//       </div>
//     );
//   };
// };

// const Foo = foo2(foo(foo(Child)));
export default class HocPage extends Component {
  render() {
    return (
      <div>
        <h3>HocPage</h3>
        {/* <Foo /> */}
        <Child />
      </div>
    );
  }
}
