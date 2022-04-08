import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../Context/AuthContext';
import { AuthService } from '../../services/AuthService';
import "../../components/Navbar.css";


export function CheckRoutes() {

    type routes = {
        name: string;
        path: string;
    }

    const {isUserLoggedIn , currentUser, isAdmin} = useAuth()

    const service = new AuthService();
        const logout = async () => {
            var response = await service.Logout();
            if (response.Success !== true) {
                toast.error("Não foi possível fechar a sessão corretamente!");              
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
                        path: "/Products",
                    },
                    {
                        name: "Products Types",
                        path: "/ProductsTypes",
                    },
                ]
            } if (!isAdmin()) {
                Links = [
                    {
                        name: "User",
                        path: "/user",
                    },
                    {
                        name: "Products",
                        path: "/Products",
                    },
                ]
            }
        } else {
            Links = [
                {
                    name: "Signup",
                    path: "/Signup",
                },
            ]
        }

        return (
            <div>
                <div className="navbar">
                    <div className="logo">My Products</div>
                    <div className="nav-items">
                        {Links.map((item, index) => {
                            return (
                                <div key={index} className="nav-item">
                                    <Link to={item.path} className='href'>{item.name}</Link>                              
                                </div>
                            )
                        })}
                        {
                            (isUserLoggedIn === true) ? 
                            <button className="nav-item bg-transparent border-0" onClick={logout}>Signout</button>
                            : 
                            ""
                        }
                    </div>
                </div>
            </div>
        )
    }

export default CheckRoutes