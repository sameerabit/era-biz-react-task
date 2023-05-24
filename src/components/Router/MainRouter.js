import React, { useEffect, useState } from 'react';

import { Layout, Menu, Button, theme } from 'antd';
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Navigate,
    BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import LoginForm from '../Login/LoginForm';
import ProductList from '../Product/ProductList';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { checkAuthentication } from '../../reducers/authReducer';

const { Header, Sider, Content } = Layout;

const MainRouter = (props) => {
    const { authenticated } = props;
    console.log('authenticated: ', authenticated)

    const dispatch = useDispatch();

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {
        dispatch(checkAuthentication());
    }, []);

    return (

        <>
            {
                !authenticated ? <Router>
                    <Routes Routes >
                        <Route exact path="/login" element={<LoginForm />} />
                        <Route exact path="/register" element={<LoginForm />} />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                </Router> : <Router>
                    <Routes>
                        <Route exact path="/products" element={<ProductList />} />
                        <Route path="*" element={<Navigate to="/products" replace />} />
                    </Routes>
                </Router>
            }
        </>

    );
};

export default connect((state) => {
    return {
        authenticated: state.auth.authenticated
    }
})(MainRouter);