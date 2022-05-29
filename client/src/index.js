import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './store/store';

axios.defaults.baseURL = 'http://localhost:8080/shopapi';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    //if token saved in localStorage
    config.headers['token'] = token;
  }
  config.headers['Content-Type'] = 'application/json';
  return config;
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
