import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app';
import store from './state/store';
import { getNodeData, getSettings } from './state/actions';

ReactDOM.render((
  <Provider store={store}>
    <App Router={BrowserRouter} />
  </Provider>
), document.getElementById('root'));

store.dispatch(getSettings());
store.dispatch(getNodeData());
