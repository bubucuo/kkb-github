/* eslint-disable no-console */
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Form, Input, Button, Table } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'city',
    key: 'city',
  },
];

export default connect(({ more }) => ({ more }), {
  getMoreData: () => ({ type: 'more/getChannelData' }),
  getMoreDataBySearch: search => ({ type: 'more/getChannelDataBySearch', payload: search }),
})(
  class More extends Component {
    componentDidMount() {
      this.props.getMoreData();
    }

    onFinish = values => {
      console.log('values', values); // sy-log
      this.props.getMoreDataBySearch(values);
    };

    onFinishFailed = err => {
      console.log('err', err); // sy-log
    };

    render() {
      const { data } = this.props.more;
      console.log('oo', this.props); // sy-log
      return (
        <PageHeaderWrapper className={styles.more}>
          <Card>
            <Form onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
              <Form.Item
                label="姓名"
                name="name"
                rules={[{ required: true, message: '请输入姓名查询' }]}
              >
                <Input placeholder="请输入姓名" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
              </Form.Item>
            </Form>
          </Card>

          <Card>
            <Table dataSource={data} columns={columns} rowKey="id" />
          </Card>
        </PageHeaderWrapper>
      );
    }
  },
);
