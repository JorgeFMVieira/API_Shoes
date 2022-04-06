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

function App() {
        
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Signin />} />
                    <Route path='/Signup' element={<Signup />} />
                    <Route path='/Signin' element={<Signin />} />
                    <Route path='/Products' element={<Products />} />
                    <Route path='/ProductsType' element={<ProductsType />} />
                    <Route path='/ApiError' element={<ApiError />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App