import React, { useState } from 'react';
import './Signin.css';
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthService } from '../services/AuthService';
import { LoginDTO } from '../Models/Auth/LoginDTO';
import { useAuth } from '../Context/AuthContext';
import CheckRoutes from './Routes/CheckRoutes';

function Signin() {

    const Navigate = useNavigate()
    const service: AuthService = new AuthService();
    const { setCurrentUser } = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [UserRole, setUserRole] = useState<string[] | undefined>([]);
    const [IsLoggin, setIsLoggin] = useState(false);

    const Login = async () => {
        

        const login: LoginDTO = {
            email: email,
            password: password
        }
        if(login.email == "" || login.password == ""){
            toast.error("Please, fill all fields.");
        }

        var response = await service.Login(login); 
        

        if (response.Success == true && response.Obj != null) {
            setCurrentUser(response.Obj);         
            toast.success("Signed In Sucessfully!");
            setUserRole(response.Obj.roles);
            setIsLoggin(true);
            Navigate("/Products");
        }
        else {
            console.log(response);           
        }
    }  

    return (
        <div>
            <ToastContainer />
            <CheckRoutes />
            <div className="sign">
                <div className="sign-title"><h1>Sign in</h1></div>
                <div className="sign-form">
                    <div className="sign-form-item">
                        <div className="sign-form-icon"><AiOutlineUser /></div>
                        <input type="text" className="sign-form-item-input" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="sign-form-item">
                        <div className="sign-form-icon"><AiOutlineLock /></div>
                        <input type="password" className="sign-form-item-input" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="sign-form-item">
                        <button className='sign-button' type='submit' onClick={Login}>SIGN IN</button>
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
        </div>
    )
}

export default Signin