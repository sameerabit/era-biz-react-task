import React from 'react';
import './index.css';
import {
    Form,
    Input,
    Button,
    Upload,
    Alert,
    Image
} from 'antd';
import { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { productService } from '../../services/productService';


const ProductForm = (props) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [displayAlert, setDisplayAlert] = useState({
        type: null,
        message: null,
        visible: false
    });

    if (props.modalName === "Edit") {
        useEffect(() => {
            form.setFieldsValue(props.product);
            productService.getProductImage(props.product.id).then((data) => {
                setImageSrc(data);
            });
        }, []);


    }

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
            form={form}
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
                extra="max 2048MB"
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
            <Image
                width={200}
                src={imageSrc}
            />
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Save
                </Button>
            </Form.Item>

        </Form>
    );
};
export default ProductForm;