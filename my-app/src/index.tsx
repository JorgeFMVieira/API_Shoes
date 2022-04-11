import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from './pages/Products';
import ProductsType from './pages/ProductsType';
import ApiError from './pages/ApiError';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { AuthService } from './services/AuthService';
import { AuthDTO } from './Models/Auth/AuthDTO';
import { AuthProvider } from './Context/AuthContext';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';


const service: AuthService = new AuthService();

service.GetUser().then(result => {
    var user: AuthDTO | null = null;

    if (result.success === true && result.obj != null && result.obj.token != null) {
        user = result.obj
    }

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider user={user}>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/Signup' element={<Signup />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Products' element={<Products />} />
                <Route path='/ProductsType' element={<ProductsType />} />
                <Route path='/ApiError' element={<ApiError />} />
                <Route path='/ForgotPassword' element={<ForgotPassword />} />
                <Route path='/ResetPassword' element={<ResetPassword />} />
            </Routes>
        </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root'));
});