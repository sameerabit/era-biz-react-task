import {
    Button,
    Form,
    Input,
    Space,
    Layout
} from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../reducers/authReducer';
import { Typography } from 'antd';
const { Title } = Typography;
const { Content } = Layout;

const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: 'black',
    backgroundColor: 'white',
    width: 500
};

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const Register = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const onFinish = (values) => {
        try {
            dispatch(registerUser(values));

        } catch (err) {
            setDisplayAlert({
                type: 'error',
                message: err.response.data.message,
                visible: true
            });
        }
    };

    const [displayAlert, setDisplayAlert] = useState({
        type: null,
        message: null,
        visible: false
    });


    return (
        <Space style={{ width: '100%', justifyContent: 'center' }}>
            <Layout>
                <Content style={contentStyle}>
                    <Title level="3" >Register</Title>

                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        style={{
                            maxWidth: 600,
                        }
                        }
                        scrollToFirstError
                    >
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="password_confirmation"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </Layout>
        </Space>
    );
};
export default Register;