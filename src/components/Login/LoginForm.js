import React from 'react';
import './index.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

import { Layout, Space } from 'antd';

import { Typography } from 'antd';
import { loginService } from '../../services/loginService';

const { Title } = Typography;

const { Header, Footer, Sider, Content } = Layout;

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: 'black',
    backgroundColor: 'white',
    width: 300
};

const LoginForm: React.FC = () => {
    const onFinish = (values: any) => {
        loginService.login(values);
    };

    return (
        <Space style={{ width: '100%', justifyContent: 'center' }}>
            <Layout>
                <Content style={contentStyle}>
                    <Title level="3" >Era Biz</Title>
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