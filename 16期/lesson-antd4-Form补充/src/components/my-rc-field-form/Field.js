import React, {Component} from "react";
import FieldContext from "./FieldContext";

export default class Field extends Component {
  static contextType = FieldContext;

  componentDidMount() {
    const {registerFiled} = this.context;
    this.cancelRegisterFiled = registerFiled(this);
  }

  componentWillUnmount() {
    if (this.cancelRegisterFiled) {
      this.cancelRegisterFiled();
    }
  }

  onStoreChange = () => {
    this.forceUpdate();
  };

  getControlled = () => {
    const {getFieldValue, setFieldsValue} = this.context;
    const {name} = this.props;
    return {
      value: getFieldValue(name) || "", //取值
      onChange: event => {
        let newValue = event.target.value;
        //存值
        setFieldsValue({[name]: newValue});
      }
    };
  };
  render() {
    const {children} = this.props;
    const returnChildNode = React.cloneElement(children, this.getControlled());
    return returnChildNode;
  }
}
