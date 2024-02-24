import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { blogSlice } from './features/blogs/blogSlice.js';
import { store, persistor } from './app/api/store.js';
import { PersistGate } from 'redux-persist/integration/react';

store.dispatch(blogSlice.endpoints.getBlogs.initiate());
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
