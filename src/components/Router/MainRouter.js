import React, { useEffect } from 'react';

import {
    Navigate,
    BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import LoginForm from '../Login/LoginForm';
import ProductList from '../Product/ProductList';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { checkAuthentication } from '../../reducers/authReducer';
import Register from '../Register/Register';

const MainRouter = (props) => {
    const { authenticated } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuthentication());
    }, []);

    return (

        <>
            {
                !authenticated ? <Router>
                    <Routes Routes >
                        <Route exact path="/login" element={<LoginForm />} />
                        <Route exact path="/register" element={<Register />} />
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