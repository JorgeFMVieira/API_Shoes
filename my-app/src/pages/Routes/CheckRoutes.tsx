import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../Context/AuthContext';
import { AuthService } from '../../services/AuthService';
import "../../components/Navbar.css";
import { useEffect } from 'react';


export function CheckRoutes() {

    type routes = {
        name: string;
        link: string;
    }
    const service = new AuthService();
    const { isUserLoggedIn, currentUser, isAdmin } = useAuth();

    const logout = async () => {
        var response = await service.Logout();
        if (response.success !== true) {
            toast.error("We couldn´t sign you out.");
            return;
        }
        console.log(isUserLoggedIn);
        window.location.href = "/Login";

    }
    var Links: routes[] = [];

    if (isUserLoggedIn === true && currentUser !== null) {
        if (isAdmin()) {
            Links = [
                {
                    name: "Products",
                    link: "/Products",
                },
                {
                    name: "ProductsTypes",
                    link: "/ProductsTypes",
                },
                {
                    name: "Logout",
                    link: "/Logout",
                },
            ]
        } if (!isAdmin()) {
            Links = [
                {
                    name: "Products",
                    link: "/Products",
                },
                {
                    name: "ProductsTypes",
                    link: "/ProductsTypes",
                },
                {
                    name: "Logout",
                    link: "/Logout",
                },
            ]
        }
    } else {
        Links = [
            {
                name: "Signin",
                link: "/Login",
            },
            {
                name: "Signup",
                link: "/Signup",
            },
        ]
    }

    console.log(currentUser);

    return (
        <div>
            <div className="navbar">
                <div className="logo">My Products</div>
                <div className="nav-items">
                    {Links.map((item, index) => {
                        return (
                            <div key={index} className="nav-item">
                                <Link to={item.link} className='href'>{item.name}</Link>
                            </div>
                        )
                    })}
                    {
                        (isUserLoggedIn === true) ?
                            <div className="nav-item">
                                <div onClick={logout} className='href'>Signout</div>
                            </div>
                            :
                            ""
                    }
                </div>
            </div>
        </div>
    )
}

export default CheckRoutes