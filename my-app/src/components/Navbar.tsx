import React from 'react'
import { Link } from "react-router-dom"
import './Navbar.css'

function Navbar() {



    return (
        <div className="navbar">
            <div className="logo">My Products</div>
            <div className="nav-items">
                <div className="nav-item">
                    <Link to="/" className='href'>Home</Link>
                </div>
                <div className="nav-item">
                    <Link to="/Products" className='href'>Products</Link>
                </div>
                <div className="nav-item">
                    <Link to="/ProductsType" className='href'>Products Type</Link>
                </div>
                <div className="nav-item">
                    <Link to="/" className='href'>Sign in</Link>
                </div>
                <div className="nav-item">
                    <Link to="/" className='href'>Sign up</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar