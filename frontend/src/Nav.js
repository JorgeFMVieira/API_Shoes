import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom';


function Nav() {
  return (
    <div className="navbar">
    <div className="logo">My Products</div>
    <div className="nav-items">
        <div className="nav-item">
          <Link to="/products" className='href'>Products</Link>
        </div>
        <div className="nav-item">
        <Link to="/productsType" className='href'>Products Type</Link>
        </div>
    </div>
</div>
  )
}

export default Nav