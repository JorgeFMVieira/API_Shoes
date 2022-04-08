import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../Context/AuthContext';
import { LoginDTO } from '../Models/Auth/LoginDTO';
import { AuthService } from '../services/AuthService';
import { CheckRoutes } from './Routes/CheckRoutes';
import './Signin.css';

function Login() {

    const Navigate = useNavigate();
    const service: AuthService = new AuthService();
    const { setCurrentUser } = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [UserRole, setUserRole] = useState<string[] | undefined>([]);
    const [signedIn, setSignedIn] = useState(false);

    const Sign = async () => {
        const Sign: LoginDTO = {
            email: email,
            password: password
        }

        if (Sign.email === "" || Sign.password === "") {
            toast.error("Please, fill all fields.");
            return;
        }

        var response = await service.Login(Sign);

        if (response.success === true && response.obj != null) {
            setCurrentUser(response.obj);
            toast.success("Signed in sucessfully!");
            setUserRole(response.obj.roles);
            setSignedIn(true);
            Navigate("/Products");
        }
        else {
            toast.error("We were unable to sign you in. Please, try again.");
        }
    }

    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordIconShow, setPasswordIconShow] = useState(true);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
        setPasswordIconShow(!passwordIconShow);
    };


    return (
        <div>
            <ToastContainer />
            <CheckRoutes />
            <div className="sign">
                <div className="sign-title"><h1>Sign in</h1></div>
                <div className="sign-form">
                    <div className="sign-form-item">
                        <div className="sign-form-icon"><AiOutlineUser /></div>
                        <div className="password-container">
                            <input type="text" className="sign-form-item-input" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="sign-form-item">
                        <div className="sign-form-icon"><AiOutlineLock /></div>
                        <div className="password-container">
                            <input type={passwordShown ? "type" : "password"} className="sign-form-item-input" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                            <div className="show-password-container" onClick={togglePassword}>
                                {passwordIconShow ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </div>
                        </div>
                    </div>
                    <div className="sign-form-item">
                        <button className='sign-button' type='submit' onClick={Sign}>SIGN IN</button>
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
export default Login