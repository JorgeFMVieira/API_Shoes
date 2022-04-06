import React, { useEffect, useState } from 'react'
import NavbarSign from '../components/NavbarSign'
import './Signin.css'
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai"
import { Link } from 'react-router-dom'
import Signup from './Signup'
import { AuthenticationService } from '../services/AuthenticationService'
import { LoginDTO } from '../Models/Auth/LoginDTO'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CheckRoutes} from '../components/Routes/CheckRoutes'

function Signin() {

    const [user, setUser] = useState<LoginDTO>(new LoginDTO());

    const [userRole, setUserRole] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const service = new AuthenticationService();

    const tryAuthenticate = async () => {
        if(user.email != "" && user.password != ""){
            service.loginUser(user)
            .then(result => {
                if(result.error == true){
                    toast.error(result.errorMsg);
                }else{
                    setUserRole(result.user[0].role);
                    setIsLoggedIn(true);
                }
            });
            return;
        }else{
            toast.error("Please, fill all fields");
            return;
        }
    }

    useEffect(() => {
        service.loginUser(user);
    }, [user, userRole]);

    return (
        <div>
            <ToastContainer />
            <div className="sign">
                <div className="sign-title"><h1>Sign in</h1></div>
                <div className="sign-form">
                    <div className="sign-form-item">
                        <div className="sign-form-icon"><AiOutlineUser /></div>
                        <input type="text" className="sign-form-item-input" placeholder='Email' onChange={(e) => setUser({ ...user,  email: e.target.value })} />
                    </div>
                    <div className="sign-form-item">
                        <div className="sign-form-icon"><AiOutlineLock /></div>
                        <input type="password" className="sign-form-item-input" placeholder='Password' onChange={(e) => setUser({ ...user,  password: e.target.value })} />
                    </div>
                    <div className="sign-form-item">
                        <button className='sign-button' onClick={() => tryAuthenticate()}>SIGN IN</button>
                    </div>
                    <div className="sign-form-item">
                        <span className="redirect">
                            Don´t have an account? <Link to="/Signup" className='noHref'>Create one Now</Link>
                        </span>
                    </div>
                    <div className="sign-form-item">
                        <span className="redirect">
                            Forgot your password? <Link to="/RecoverPassword" className='noHref'>Recover it Now</Link>
                        </span>
                    </div>
                </div>
            </div>
            <CheckRoutes userRole={userRole} isLoggedIn={isLoggedIn} />
        </div>
    )
}

export default Signin