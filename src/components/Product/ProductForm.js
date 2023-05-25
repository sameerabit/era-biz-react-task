import React from 'react';
import './index.css';
import {
    Form,
    Input,
    Button,
    Upload,
    Alert,
    Image,
    message
} from 'antd';
import { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { productService } from '../../services/productService';
import Cookies from "js-cookie";
import ReactRecaptcha3 from 'react-google-recaptcha3';
import { CONFIG } from '../../constants';


const ProductForm = (props) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [displayAlert, setDisplayAlert] = useState({
        type: null,
        message: null,
        visible: false
    });
    const [fileList, setFileList] = useState({});

    if (props.modalName === "Edit") {
        useEffect(() => {
            form.setFieldsValue(props.product);
            productService.getProductImage(props.product.id).then((data) => {
                setImageSrc(props.product.image_url);
            });
        }, []);
    }

    useEffect(() => {
        ReactRecaptcha3.init(CONFIG.RECAPTCHA_KEY).then(
            (status) => status
        );
    }, [])

    const save = async (values) => {
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
    }

    const handleUpload = async (data) => {
        if (props.modalName != 'Edit') {
            return false;
        }
        try {
            let values = {
                image: data
            }
            let savedProductResponse = await productService.uploadImage(values, props.product.id);
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
    }

    const update = async (values) => {
        setLoading(true);
        try {
            values.id = props.product.id;
            let savedProductResponse = await productService.updateProduct(values);
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
    }

    const onFinish = async (values) => {
        let token = await ReactRecaptcha3.getToken().then((token) => token);
        values.token = token;
        if (props.modalName === "Edit") {
            update(values);
        } else {
            save(values);
        }

    };
    const onFinishFailed = (errorInfo) => {
    };

    const normFile = (e) => {
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
            >
                <Upload {...fileList}
                    listType="picture"
                    accept="image/png, image/jpeg"
                    beforeUpload={() => false}
                    maxCount={1}
                    onChange={(data) => {
                        handleUpload(data)
                    }}
                >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>

            </Form.Item>
            <>{
                props.modalName === 'Edit' ? <Image
                    style={{
                        marginLeft: 100,
                    }}
                    width={200}
                    height={200}
                    src={imageSrc}
                /> : ''
            }</>

            <Form.Item>
                <Button type="primary" size='large' htmlType="submit" loading={loading}>
                    Save
                </Button>
            </Form.Item>

        </Form >
    );
};
export default ProductForm;