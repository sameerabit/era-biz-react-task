import React, { useState } from 'react';
import './index.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

import { Layout, Space, Alert } from 'antd';

import { Typography } from 'antd';
import { loginService } from '../../services/loginService';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../reducers/authReducer';

const { Title } = Typography;

const { Header, Footer, Sider, Content } = Layout;

const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: 'black',
    backgroundColor: 'white',
    width: 300
};

const LoginForm = () => {

    const dispatch = useDispatch();

    const onFinish = async (values) => {
        try {
            // let x = await loginService.login(values);

            dispatch(loginUser(values));

        } catch (err) {
            console.log(err);
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
                    <Title level="3" >Era Biz</Title>

                    {displayAlert.visible ? <Alert message={displayAlert.message} type={displayAlert.type} closable showIcon /> : null}

                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                        >
                            <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                size="large"
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button size="large" type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="">register now!</a>
                        </Form.Item>
                    </Form>

                </Content>
            </Layout>
        </Space>

    );
};

export default LoginForm;