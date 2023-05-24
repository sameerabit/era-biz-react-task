import React, { useEffect, useState } from 'react';
import './index.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Table, Tag } from 'antd';

import { Layout, Space } from 'antd';

import { Typography } from 'antd';
import ProductFormModal from './ProductFormModal';
import { productService } from '../../services/productService';

const { Title } = Typography;

const { Content } = Layout;

const contentStyle = {
  textAlign: 'left',
  minHeight: 120,
  lineHeight: '120px',
  color: 'black',
  backgroundColor: 'white',
  width: 800
};

const columns = [

  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const ProductList = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);



  useEffect(() => {
    getAllProducts(1);
  }, []);

  const getAllProducts = async (page) => {
    setLoading(true);
    productService.getAll(page).then((response) => {
      setProducts(response.data);
      setTotalPages(response.meta.total);
      setLoading(false);
    });
  }

  return (
    <Space style={{ width: '100%', justifyContent: 'left' }}>
      <Content style={contentStyle}>

        <ProductFormModal></ProductFormModal>
        <Title level="3" >Products</Title>

        <Table
          columns={columns}
          dataSource={products}
          loading={loading}
          pagination={{
            pageSize: 10,
            total: totalPages,
            onChange: (page) => {
              getAllProducts(page)
            }
          }}
        />;

      </Content>
    </Space>

  );
};

export default ProductList