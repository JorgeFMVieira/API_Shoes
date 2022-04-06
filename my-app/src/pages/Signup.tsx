import React, { useEffect, useState } from 'react'
import NavbarSign from '../components/NavbarSign'
import './Signin.css'
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai"
import { Link } from 'react-router-dom'
import Signin from './Signin'
import { AuthenticationService } from '../services/AuthenticationService'
import { LoginDTO } from '../Models/Auth/LoginDTO'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CheckRoutes} from '../components/Routes/CheckRoutes';
import { AuthDTO } from '../Models/Auth/AuthDTO'
import { Api } from '../providers/api'

function Signup() {

  class confirmPassword {
    confirmPassword: string = "";
  }

  const service = new AuthenticationService();
  const [user, setUser] = useState<AuthDTO>(new AuthDTO());
  const [cPassword, setCPassword] = useState<confirmPassword>(new confirmPassword());

    const tryCreateUser = async () => {
        if(user.email != "" && user.username != "" && user.password != "" && cPassword.confirmPassword != ""){
              setUser({...user, role: "Client"});
              service.createUser(user).then(response => {
                if(response.error == true){
                  console.log(response.error);
                }else{
                  toast.success("User created successfully!");
                  console.log(response.user);
                }
              });
            return;
        }else{
            toast.error("Please, fill all fields");
            return;
        }
    }

  useEffect(() => {
      service.createUser(user);
  }, [user]);

    return (
        <div>
            <ToastContainer />
            <div className="sign">
                <div className="sign-title"><h1>Sign Up</h1></div>
                <div className="sign-form">
                    <div className="sign-form-item">
                        <div className="sign-form-icon"><AiOutlineUser /></div>
                        <input type="text" className="sign-form-item-input" placeholder='Email' onChange={(e) => (setUser({ ...user, email: e.target.value }), console.log(e.target.value))} />
                    </div>
                    <div className="sign-form-item">
                        <div className="sign-form-icon"><AiOutlineUser /></div>
                        <input type="text" className="sign-form-item-input" placeholder='Username' onChange={(e) => (setUser({ ...user, username: e.target.value }), console.log(e.target.value))} />
                    </div>
                    <div className="sign-form-item">
                        <div className="sign-form-icon"><AiOutlineLock /></div>
                        <input type="password" className="sign-form-item-input" placeholder='Password' onChange={(e) => setUser({ ...user, password: e.target.value })} />
                    </div>
                    <div className="sign-form-item">
                        <div className="sign-form-icon"><AiOutlineLock /></div>
                        <input type="password" className="sign-form-item-input" placeholder='Confirm Password' onChange={(e) => setCPassword({ ...user, confirmPassword: e.target.value })} />
                    </div>
                    <div className="sign-form-item">
                        <button className='sign-button' onClick={() => tryCreateUser()}>SIGN UP</button>
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

export default Signup