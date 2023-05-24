import React from 'react';
import './index.css';
import { PlusOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    Button,
    message,
    Upload,
    Alert
} from 'antd';
import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { productService } from '../../services/productService';


const ProductForm = (props) => {

    const [loading, setLoading] = useState(false);
    const [displayAlert, setDisplayAlert] = useState({
        type: null,
        message: null,
        visible: false
    });

    const onFinish = async (values) => {
        setLoading(true);
        try {
            let savedProductResponse = await productService.saveProduct(values);
            if (savedProductResponse.id) {
                props.closeModelCallback();
                setLoading(false);
            }
        } catch (err) {
            setDisplayAlert({
                type: 'error',
                message: err.response.data.message,
                visible: true
            });
            setLoading(false);
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e.fileList;
    };


    return (

        <Form
            labelCol={{
                span: 5,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            style={{
                maxWidth: 600,
            }}

            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            {displayAlert.visible ? <Alert message={displayAlert.message} type={displayAlert.type} closable showIcon /> : null}

            <Form.Item
                label="name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="description"
                name="description"
            >
                <Input />
            </Form.Item>

            <Form.Item label="price"
                name="price"
                rules={[
                    {
                        required: true,
                        message: 'Please input your price!',
                    },
                ]}>
                <Input />
            </Form.Item>

            <Form.Item label="Image"
                name="image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="longgggggggggggggggggggggggggggggggggg"
                rules={[
                    {
                        required: true,
                        message: 'Please input your !',
                    },
                ]}
            >
                <Upload
                    listType="picture"
                    accept="image/png, image/jpeg"
                    maxCount={1}
                    beforeUpload={() => false}
                >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Save
                </Button>
            </Form.Item>

        </Form>
    );
};
export default ProductForm;