// export default Signup
import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthDTO } from '../Models/Auth/AuthDTO';
import { AuthService } from '../services/AuthService';
import CheckRoutes from './Routes/CheckRoutes'
import validator from 'validator'

function Signup() {

    const Navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const service: AuthService = new AuthService();
    const [cPassword, setCPassword] = useState("");

    const Criar = async () => {

        const Register: AuthDTO = {
            username: username,
            email: email,
            password: password
        }

        if (Register.username === "" || Register.email === "" || Register.password === "") {
            toast.error("Please, fill all fields!");
            return;
        }

        if(validator.isEmail(Register.email) === false){
            toast.error("Please, enter a valid email.");
            return;
        }

        if (Register.password != cPassword) {
            toast.error("Password don´t match.");
            return;
        }

        if(validator.isStrongPassword(Register.password) === false){
            console.log(Register.password);
            toast.error("Password must contain at least 6 characters, one uppercase letter, one lowercase letter, one number and one special character.");
            return;
        }

        var response = await service.Register(Register);

        if(response.message === "Already exists an user with that email"){
            toast.error("There is already an user with that email.");
            return;
        }

        if (response.success === true) {
            toast.success("Account create sucessfully!");
            setTimeout(() => {
                Navigate("/Login");
            }, 3000);
        }
        else {
            console.log(response);
        }
    }
    const [passwordShown, setPasswordShown] = useState(false);
    const[passwordIconShow, setPasswordIconShow] = useState(true);

    const togglePassword = () => {
      setPasswordShown(!passwordShown);
      setPasswordIconShow(!passwordIconShow);
    };

    const [passwordShown2, setPasswordShown2] = useState(false);
    const[passwordIconShow2, setPasswordIconShow2] = useState(true);

    const togglePassword2 = () => {
      setPasswordShown2(!passwordShown2);
      setPasswordIconShow2(!passwordIconShow2);
    };

    return (
        <div>
            <ToastContainer />
            <CheckRoutes />
            <div className="sign">
                <div className="sign-title"><h1>Sign Up</h1></div>
                <div className="sign-form">
                    <div className="sign-form-item">
                        <div className="sign-form-icon"><AiOutlineUser /></div>
                        <div className="password-container">
                            <input type="text" className="sign-form-item-input" name="Email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="sign-form-item">
                        <div className="sign-form-icon"><AiOutlineUser /></div>
                        <div className="password-container">
                            <input type="text" className="sign-form-item-input" name="Username" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                        </div>
                    </div>
                    <div className="sign-form-item">
                        <div className="sign-form-icon"><AiOutlineLock /></div>
                        <div className="password-container">
                            <input type={passwordShown ? "text" : "password"} className="sign-form-item-input" name="Password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                            <div className="show-password-container" onClick={togglePassword}>
                                {passwordIconShow ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </div>
                        </div>
                    </div>
                    <div className="sign-form-item">
                        <div className="sign-form-icon"><AiOutlineLock /></div>
                        <div className="password-container">
                            <input type={passwordShown2 ? "text" : "password"} className="sign-form-item-input" placeholder='Confirm Password' onChange={(e) => setCPassword(e.target.value)} />
                            <div className="show-password-container" onClick={togglePassword2}>
                                {passwordIconShow2 ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </div>
                        </div>
                    </div>
                    <div className="sign-form-item">
                        <button className='sign-button' onClick={Criar}>SIGN UP</button>
                    </div>
                    <div className="sign-form-item">
                        <span className="redirect">
                            Already have an account? <Link to="/Login" className='noHref'>Sign In</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup