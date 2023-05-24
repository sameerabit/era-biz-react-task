import React from 'react';
import './index.css';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button
} from 'antd';
import { useState } from 'react';
const { TextArea } = Input;

const ProductForm = () => {
  return (
      
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
      >
        
        <Form.Item label="Name">
          <Input />
        </Form.Item>

        <Form.Item label="Description">
          <Input />
        </Form.Item>

        <Form.Item label="Price">
          <Input />
        </Form.Item>

        <Form.Item label="Image">
          <Input />
        </Form.Item>
       
        <Form.Item>
          <Button>Button</Button>
        </Form.Item>
      </Form>
  );
};
export default ProductForm;