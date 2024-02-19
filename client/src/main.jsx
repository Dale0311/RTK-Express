import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { blogSlice } from './features/blogs/blogSlice.js';
import store from './app/api/store.js';

store.dispatch(blogSlice.endpoints.getBlogs.initiate());
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
