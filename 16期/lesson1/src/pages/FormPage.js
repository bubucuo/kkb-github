import React, {Component} from "react";
import {Form, Input, Icon, Button} from "antd";

export default class FormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: ""
    };
  }
  submit = () => {
    console.log("submit", this.state); //sy-log
  };
  render() {
    const {name, password} = this.state;
    return (
      <div>
        <h3>FormPage</h3>
        <Form>
          <Form.Item>
            <Input
              placeholder="please input ur name"
              value={name}
              onChange={e =>
                this.setState({
                  name: e.target.value
                })
              }
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="password"
              placeholder="please input ur password"
              value={password}
              onChange={e =>
                this.setState({
                  password: e.target.value
                })
              }
            />
          </Form.Item>
          <Button type="primary" onClick={this.submit}>
            提交
          </Button>
        </Form>
      </div>
    );
  }
}
