import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './pages/Products';
import ApiError from './pages/ApiError';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
          <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Products' element={<Products />} />
                <Route path='/ApiError' element={<ApiError />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
