import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';
import Popper from 'popper.js';


import App from './App';
import { AuthProvider } from './context/AuthProvider';
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import TopBar from './component/LayoutBar/TopBar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
  </React.StrictMode>
);

