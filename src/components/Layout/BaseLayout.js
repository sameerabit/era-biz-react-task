import React from 'react';
import { Layout, theme, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { logoutUser, checkAuthentication } from '../../reducers/authReducer';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';


const { Header, Content, Footer } = Layout;

const BaseLayout = (props) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { children } = props;

    const { authenticated } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuthentication());
    }, []);

    const logout = () => {
        dispatch(logoutUser());
    }

    return (
        <Layout style={{ height: "100vh" }}>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <>
                    {
                        authenticated ? <Button onClick={logout}>Log out {authenticated}</Button> : ''
                    }
                </>
                <div className="demo-logo" />
            </Header>
            <Content
                className="site-layout"
                style={{
                    padding: '0 50px',
                }}
            >
                <div
                    style={{
                        padding: 24,
                        minHeight: 380,
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Ant Design ©2023 Created by SapienCoder &copy; Viraj
            </Footer>
        </Layout>
    );
};

export default connect((state) => {
    return {
        authenticated: state.auth.authenticated
    }
})(BaseLayout);