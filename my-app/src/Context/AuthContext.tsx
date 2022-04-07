import React, { useState, useEffect } from "react";
import { AuthDTO } from "../Models/Auth/AuthDTO";
import { APIService } from "../services/APIService";

interface AuthContextProps {
    currentUser: AuthDTO | null,
    children?: React.ReactNode,
    setCurrentUser: (user: AuthDTO | null) => void,
    isUserLoggedIn: boolean,
    userRoles: string[],
    isAdmin: () => boolean,
}

const AuthContext = React.createContext<AuthContextProps>({
    currentUser: null,
    setCurrentUser: () => { },
    isUserLoggedIn: false,
    userRoles: [],
    isAdmin: () => { return false }
});

interface AuthProviderProps {
    user: AuthDTO | null,
    children?: any
}

export const AuthProvider = (props: AuthProviderProps) => {
    const Roles: string[] = ["Admin", "Client"];
    const [currentUser, setCurrentUser] = useState<AuthDTO | null>(props.user);
    const [userRoles, setUserRoles] = useState<string[]>([]);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(props.user != null ? true : false);

    APIService.SetToken(currentUser?.token ?? null);

    const loginUser = (user: AuthDTO | null) => {

        if (isUserValid(user) === false) {
            setCurrentUser(null);
            setIsUserLoggedIn(false)
            setUserRoles([]);
            return;
        }

        setCurrentUser(user);


        setIsUserLoggedIn(true);


        if (user != null) {
            setUserRoles(getRoles(user))
        }

    }

    const isUserValid = (user: any): boolean => {
        if (typeof user == 'undefined') return false;
        if (user == null) return false;
        if (user.token == null) return false;

        return true;

    }

    const getRoles = (user: AuthDTO): string[] => {
        var roles: string[] = [];
        if (user.roles !== null && typeof user.roles !== "undefined" && user.roles !== []) {
            user.roles.forEach((a: string) => {
                roles.push(a)
            });
        }
        return roles;
    }

    const isAdmin = (): boolean => {
        if (currentUser == null) return false;
        if (currentUser.roles?.findIndex(r => r.toUpperCase() === "ADMIN") !== -1) return true;

        return false;
    }

    useEffect(() => {
        APIService.SetToken(currentUser?.token ?? null);
    }, [currentUser])

    return (
        <AuthContext.Provider value={{
            currentUser, setCurrentUser: loginUser, isUserLoggedIn: isUserLoggedIn, userRoles,
            isAdmin: isAdmin
        }}>
            {props.children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => React.useContext(AuthContext);