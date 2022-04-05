import React from 'react'
import NavbarSign from '../components/NavbarSign'
import './Signin.css'
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai"
import { Link } from 'react-router-dom'
import Signup from './Signup'

function Signin() {
  return (
        <div>
            <NavbarSign />
            <div className="sign">
                <div className="sign-title"><h1>Sign in</h1></div>
                <div className="sign-form">
                    <div className="sign-form-item">
                        <div className="sign-form-icon"><AiOutlineUser /></div>
                        <input type="text" className="sign-form-item-input" placeholder='Email' />
                    </div>
                    <div className="sign-form-item">
                        <div className="sign-form-icon"><AiOutlineLock /></div>
                        <input type="password" className="sign-form-item-input" placeholder='Password' />
                    </div>
                    <div className="sign-form-item">
                        <button className='sign-button'>SIGN IN</button>
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