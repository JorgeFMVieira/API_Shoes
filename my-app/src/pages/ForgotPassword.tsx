import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../Context/AuthContext';
import { LoginDTO } from '../Models/Auth/LoginDTO';
import { AuthService } from '../services/AuthService';
import { UserService } from '../services/UserService';
import { CheckRoutes } from './Routes/CheckRoutes';
import { ForgotPasswordDTO } from '../Models/Password/ForgotPasswordDTO';
import './Signin.css';

function ForgotPassword() {

    const Navigate = useNavigate();
    const service = new UserService();
    const [email, setEmail] = useState<string>("");
    const [emailSent, setEmailSent] = useState(false);

    const SendEmail = async () => {
        var data: ForgotPasswordDTO = {
            email: email
        }

        if(email == "") {
            toast.error("Please, fill all fields.");
            return;
        }

        var response = await service.ForgotPassword(data)

        if (response.success == false) {
            toast.error(response.message);
            return;
        }
        setEmailSent(true);

    }


    return (
        <div>
            <ToastContainer />
            <CheckRoutes />
            <div className="sign">
            <div className="sign-title"><h1>Reset Password</h1></div>
                {emailSent ?
                    <div className="sign-form" style={{padding: '20px', backgroundColor: '#fff', maxWidth: '35ch', textAlign: 'center'}}>
                        <p>We sent you an email, please go check your inbox to reset your password.</p>
                        <Link to="/Login" className='noHref'>Go Back Home</Link>
                    </div>
                :
                        <div className="sign-form">
                            <div className="sign-form-item">
                                <div className="sign-form-icon"><AiOutlineUser /></div>
                                <div className="password-container">
                                    <input type="text" className="sign-form-item-input" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className="sign-form-item">
                                <button className='sign-button' type='submit' onClick={SendEmail}>Reset</button>
                            </div>
                            <div className="sign-form-item">
                                <span className="redirect">
                                    Changed your mind? <Link to="/Login" className='noHref'>Go Back Home</Link>
                                </span>
                            </div>
                        </div>
                }
                </div>
        </div>
    )
}
export default ForgotPassword