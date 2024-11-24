import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { persistor, store } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';
import { ConfigProvider } from "antd";
import SessionManager from './components/global/sessionManager/SessionManager.jsx';
import './App.scss'
const root = ReactDOM.createRoot(document.getElementById('root'));



const AppRoutes = () => {
  return useRoutes(App)
}

const primaryColor = (getComputedStyle(document.documentElement).getPropertyValue('--theme'))?.trim()
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <ConfigProvider
          renderEmpty={() => <p>No Record Found</p>}
          theme={{ token: { fontFamily: 'Inter', colorPrimary: primaryColor } }}>
          <Toaster position="top-right" reverseOrder={false} />
          <SessionManager />
          <AppRoutes />
        </ConfigProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
