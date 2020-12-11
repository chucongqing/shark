import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  
const AddTreeDataComp  = ()=>{

    <div>
        <Form>
            <Form.Item
                label="名称"
                name="title"
                rules={[{ required: true, message: 'Please input title!' }]}
            >
             <Input />   
            </Form.Item>
            <Form.Item
                label="UID"
                name="uid"
                rules={[{ required: true, message: 'Please input uid!' }]}
            >
             <Input />   
            </Form.Item>
            <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
        </Form>
    </div>
}

export  default AddTreeDataComp;