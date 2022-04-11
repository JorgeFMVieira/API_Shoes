import React, { useEffect, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../Context/AuthContext';
import { LoginDTO } from '../Models/Auth/LoginDTO';
import { AuthService } from '../services/AuthService';
import { UserService } from '../services/UserService';
import { CheckRoutes } from './Routes/CheckRoutes';
import './Signin.css';
import { Utilities } from '../Models/Password/Utilities';
import { ResetPasswordDTO } from '../Models/Password/ResetPasswordDTO';

function ForgotPassword() {

    const Navigate = useNavigate();
    const service = new UserService();

    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordIconShow, setPasswordIconShow] = useState(true);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
        setPasswordIconShow(!passwordIconShow);
    };

    const [passwordShown2, setPasswordShown2] = useState(false);
    const [passwordIconShow2, setPasswordIconShow2] = useState(true);

    const togglePassword2 = () => {
        setPasswordShown2(!passwordShown2);
        setPasswordIconShow2(!passwordIconShow2);
    };

    const [userId, setUserId] = useState<string>(Utilities.LoadParameterFromURLQuery("userId", "string", null));
    const [token, setToken] = useState<string>(Utilities.LoadParameterFromURLQuery("token", "string", null));
    const [password1, setPassword1] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");

    const validatePasswords = (password1: string, password2: string) => {
        if (password1 != password2) {
            return false;
        }
        return true;
    }
    const resetPassword = async () => {
        try {
            const validator = validatePasswords(password1, password2);
            if (validator === false) {
                toast.error("Passwords don´t match.")
            }
            if (validator === true) {
                const data: ResetPasswordDTO = {
                    userId: userId,
                    password: password1,
                    token: token,
                }

                var response = await service.ResetPassword(data);

            

                if (response.success === true) {
                    toast.success("Password changed sucessfully!");
                    setTimeout(() => {
                        Navigate('/Login');
                    }, 3500);
                } else {
                    toast.error(response.message);
                }
            }
        } catch (error) {
            toast.error("We were unable to reset your password. Please, try again.");
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
                        <div className="sign-form-icon"><AiOutlineLock /></div>
                        <div className="password-container">
                            <input type={passwordShown ? "type" : "password"} className="sign-form-item-input" placeholder='Password' value={password1} onChange={(e) => { setPassword1(e.target.value) }} />
                            <div className="show-password-container" onClick={togglePassword}>
                                {passwordIconShow ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </div>
                        </div>
                    </div>
                    <div className="sign-form-item">
                        <div className="sign-form-icon"><AiOutlineLock /></div>
                        <div className="password-container">
                            <input type={passwordShown2 ? "type" : "password"} className="sign-form-item-input" placeholder='Confirm Password' value={password2} onChange={(e) => { setPassword2(e.target.value) }} />
                            <div className="show-password-container" onClick={togglePassword2}>
                                {passwordIconShow2 ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </div>
                        </div>
                    </div>
                    <div className="sign-form-item">
                        <button className='sign-button' type='submit' onClick={() => {resetPassword()}}>Reset</button>
                    </div>
                    <div className="sign-form-item">
                        <span className="redirect">
                            Changed your mind? <Link to="/Login" className='noHref'>Go Back Home</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ForgotPassword