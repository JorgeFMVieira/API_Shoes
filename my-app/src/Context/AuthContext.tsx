import React, { useState, useEffect } from "react";
import { AuthDTO } from "../Models/Auth/AuthDTO";
import { APIService } from "../services/APIService";

interface AuthContextProps {
    currentUser: AuthDTO | null,
    children?: React.ReactNode,
    setCurrentUser: (user: AuthDTO | null) => void,
    isUserLoggedIn: boolean,
    userrole: string,
    isAdmin: () => boolean,
}

const AuthContext = React.createContext<AuthContextProps>({
    currentUser: null,
    setCurrentUser: () => { },
    isUserLoggedIn: false,
    userrole: "",
    isAdmin: () => { return false }
});

interface AuthProviderProps {
    user: AuthDTO | null,
    children?: any
}

export const AuthProvider = (props: AuthProviderProps) => {
    const role: string = "Admin";
    const [currentUser, setCurrentUser] = useState<AuthDTO | null>(props.user);
    const [userrole, setUserrole] = useState<string>("");
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(props.user != null ? true : false);

    APIService.SetToken(currentUser?.token ?? null);

    const loginUser = (user: AuthDTO | null) => {

        if (isUserValid(user) === false) {
            setCurrentUser(null);
            setIsUserLoggedIn(false)
            setUserrole("");
            return;
        }

        setCurrentUser(user);


        setIsUserLoggedIn(true);


        if (user != null) {
            setUserrole(getrole(user))
        }

    }

    const isUserValid = (user: any): boolean => {
        if (typeof user == 'undefined') return false;
        if (user == null) return false;
        if (user.token == null) return false;

        return true;

    }

    const getrole = (user: AuthDTO): string => {
        var role: string = "";
        if (user.role !== null && typeof user.role !== "undefined" && user.role !== "") {
            role;
        }
        return role;
    }

    const isAdmin = (): boolean => {
        if (currentUser == null) return false;
        if (currentUser.role?.includes("Admin")) return true;

        return false;
    }

    useEffect(() => {
        APIService.SetToken(currentUser?.token ?? null);
    }, [currentUser])

    return (
        <AuthContext.Provider value={{
            currentUser, setCurrentUser: loginUser, isUserLoggedIn: isUserLoggedIn, userrole,
            isAdmin: isAdmin
        }}>
            {props.children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => React.useContext(AuthContext);