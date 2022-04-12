import React from 'react'
import { Link, Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import { useAuth } from './Context/AuthContext';
import ApiError from './pages/ApiError';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import Products from './pages/Products';
import ProductsType from './pages/ProductsType';
import ResetPassword from './pages/ResetPassword';
import Signup from './pages/Signup';

function App() {

    const { isUserLoggedIn, currentUser, isAdmin } = useAuth();


    return (
        <div>
            <BrowserRouter >
            {isUserLoggedIn && currentUser != null ?
                    <Routes>
                        <Route path='/Products' element={<Products />} />
                        <Route path='/ProductsType' element={<ProductsType />} />
                    </Routes>
                    : null}
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/Signup' element={<Signup />} />
                    <Route path='/Login' element={<Login />} />
                    <Route path='/ApiError' element={<ApiError />} />
                    <Route path='/ForgotPassword' element={<ForgotPassword />} />
                    <Route path='/ResetPassword' element={<ResetPassword />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App