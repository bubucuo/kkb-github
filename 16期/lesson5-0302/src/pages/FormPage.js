import React from "react";
import {Form, Input, Button, Checkbox} from "antd";

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};

const FormPage = () => {
  const onFinish = values => {
    console.log("Success:", values);
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={{
        remember: false
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}>
      <Form.Item
        label="姓名"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!"
          }
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!"
          }
        ]}>
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormPage;
