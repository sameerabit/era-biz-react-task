import React, { useState } from 'react';
import './index.css';
import { Layout, Menu, theme } from 'antd';
import MainRouter from './components/Router/MainRouter';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Provider store={store}>
      <MainRouter />
    </Provider>
  );
};

export default App;