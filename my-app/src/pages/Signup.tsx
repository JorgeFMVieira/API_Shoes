// export default Signup
import React, { useState } from 'react'
import { AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthDTO } from '../Models/Auth/AuthDTO';
import { AuthService } from '../services/AuthService';
import CheckRoutes from './Routes/CheckRoutes'

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

      if(Register.password != cPassword) {
        toast.error("Password don´t match.");
        return;
      }

      if(Register.username === "" || Register.email === "" || Register.password === ""){
          toast.error("Preencha os campos em falta!");
          return;
      }

      var response = await service.Register(Register); 

      if (response.success === true) { 
          toast.success("Account create sucessfully!");
          Navigate("/Login");
      }
      else {
        console.log(Register.email);
        console.log(Register.password);
        console.log(Register.username);
        console.log(response);
      }

  }   

  return (
    <div>
        <ToastContainer />
        <CheckRoutes />
            <div className="sign">
                <div className="sign-title"><h1>Sign Up</h1></div>
                <div className="sign-form">
                    <div className="sign-form-item">
                        <div className="sign-form-icon"><AiOutlineUser /></div>
                        <input type="text" className="sign-form-item-input" name="Email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="sign-form-item">
                        <div className="sign-form-icon"><AiOutlineUser /></div>
                        <input type="text" className="sign-form-item-input" name="Username" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="sign-form-item">
                        <div className="sign-form-icon"><AiOutlineLock /></div>
                        <input type="password" className="sign-form-item-input" name="Password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="sign-form-item">
                        <div className="sign-form-icon"><AiOutlineLock /></div>
                        <input type="password" className="sign-form-item-input" placeholder='Confirm Password' onChange={(e) => setCPassword(e.target.value)} />
                    </div>
                    <div className="sign-form-item">
                        <button className='sign-button' onClick={Criar}>SIGN UP</button>
                    </div>
                    <div className="sign-form-item">
                        <span className="redirect">
                            Don´t have an account? <Link to="/Signup" className='noHref'>Register one Now</Link>
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