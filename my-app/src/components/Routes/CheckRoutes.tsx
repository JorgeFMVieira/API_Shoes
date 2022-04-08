import React from 'react'
import { Link } from 'react-router-dom';
import '../Navbar.css'

export type props = {
    userRole: string;
    isLoggedIn: boolean;
}
export function CheckRoutes(props: props) {

    type Routes = {
        name: string;
        link: string;
    }

    var links: Routes[] = [];

    if(props.isLoggedIn == true){
        if(props.userRole == "Admin"){
            links = [
                {
                    name: "Products",
                    link: "/Products",
                },
                {
                    name: "ProductType",
                    link: "/ProductsType",
                }
            ]
        }else if(props.userRole == "Client"){
            links = [
                {
                    name: "User",
                    link: "/User",
                },
                {
                    name: "ProductType",
                    link: "/ProductsType",
                }
            ]
        }else{
            links = [
                {
                    name: "Sign In",
                    link: "/Login",
                },
                {
                    name: "Sign Up",
                    link: "/Signup",
                }
            ]
        }
    }else{
        links = [
            {
                name: "Sign In",
                link: "/Login",
            },
            {
                name: "Sign Up",
                link: "/Signup",
            }
        ]
    }

  return (
    <div className="navbar">
        <div className="logo">My Products</div>
        <div className="nav-items">
            {links.map((item, index) => {
                return (
                    <div className="nav-item" key={index}>
                        <Link to={item.link} className='href'>{item.name}</Link>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default CheckRoutes