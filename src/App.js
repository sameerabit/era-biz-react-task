import React from 'react';
import './index.css';
import MainRouter from './components/Router/MainRouter';
import { Provider } from 'react-redux';
import store from './store';
import BaseLayout from './components/Layout/BaseLayout';

const App = () => {

  return (
    <Provider store={store}>
      <BaseLayout>
        <MainRouter />
      </BaseLayout>
    </Provider>
  );
};

export default App;