import React, { useEffect, useState } from 'react';
import './index.css';
import { Table } from 'antd';

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

const ProductList = (props) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const openProductModal = (record) => {
  }

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
          <ProductFormModal product={record} modalName='Edit'></ProductFormModal>
          <a>Delete</a>
        </Space >
      ),
    },
  ];

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

        <ProductFormModal modalName='Add'></ProductFormModal>
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