import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from "react-router-dom";
import { AuthProvider } from './Context/AuthContext';
import { AuthService } from './services/AuthService';
import { AuthDTO } from './Models/Auth/AuthDTO';
import App from './App';


const service = new AuthService();

service.GetUser().then(result => {
    var user: AuthDTO | null = null;

    if (result.success === true && result.obj != null && result.obj.token != null) {
        user = result.obj
    }

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider user={user}>
            <App />
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root'));
});