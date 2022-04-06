import React from 'react'
import { Link } from 'react-router-dom';
import '../Navbar.css'

export type props = {
    userRoles: any;
    isLoggedIn: boolean;
}
function CheckRoutes(props: any) {

    var links: any[] = [];

    if(props.isLoggedIn == true){
        if(props.userRoles == "Admin"){
            return links = [
                {
                    name: "Products",
                },
                {
                    name: "ProductType",
                }
            ]
        }else if(props.userRoles == "Client"){
            return links = [
                {
                    name: "User",
                },
                {
                    name: "ProductType",
                }
            ]
        }else{
            return links = [
                {
                    name: "Sign In",
                },
                {
                    name: "Sign Up",
                }
            ]
        }
    }

  return (
    <div className="navbar">
        <div className="logo">My Products</div>
        <div className="nav-items">
            {links.map((item, index) => {
                return (
                    <div className="nav-item" key={index}>
                        <Link to="/" className='href'>{item.name}</Link>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default CheckRoutes