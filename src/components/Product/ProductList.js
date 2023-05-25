import React, { useEffect, useState, useRef } from 'react';
import './index.css';
import { Table } from 'antd';

import { Layout, Space, Popconfirm, Button, Input } from 'antd';

import { Typography } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

import ProductFormModal from './ProductFormModal';
import { productService } from '../../services/productService';

const { Title } = Typography;

const { Content } = Layout;

const contentStyle = {
  textAlign: 'left',
  minHeight: 120,
  lineHeight: '10px',
  color: 'black',
  backgroundColor: 'white',
  width: 800
};

const ProductList = (props) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    let filters = {
      field: dataIndex,
      value: selectedKeys
    }
    getAllProducts(1, filters);
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [

    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      ...getColumnSearchProps('name'),
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
      sorter: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <ProductFormModal product={record} modalName='Edit'></ProductFormModal>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        </Space >

      ),
    },
  ];

  useEffect(() => {
    getAllProducts(1);
  }, []);

  const getAllProducts = async (page, filters) => {
    setLoading(true);
    productService.getAll(page, filters).then((response) => {
      setProducts(response.data);
      setTotalPages(response.meta.total);
      setLoading(false);
    });
  }

  const handleDelete = (id) => {
    setLoading(true);
    productService.deleteProduct(id).then((response) => {
      setLoading(false);
      getAllProducts(1);
    });
  }

  return (

    <Space style={{ width: '100%', justifyContent: 'center' }}>
      <Content style={contentStyle}>

        <div style={{ float: 'right' }}>
          <ProductFormModal modalName='Add'></ProductFormModal>
        </div>

        {/* <Title level="3" >Products</Title> */}

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