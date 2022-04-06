import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Products from './pages/Products';
import ProductsType from './pages/ProductsType';
import ApiError from './pages/ApiError';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
