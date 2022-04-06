import { Api } from "../providers/api";
import { iProductsList } from "../interfaces/Products/iProductsList";
import { LoginDTO } from "../Models/Auth/LoginDTO";
import { ListUser } from "../interfaces/Authentication/IAuthentication";
import { AuthDTO } from "../Models/Auth/AuthDTO";
    export class AuthenticationService {
        async loginUser(authenticate: LoginDTO): Promise<ListUser<LoginDTO>> {
            return await Api.post('Login', {...authenticate})
                .then(response => {
                    return response.data;
                }).catch(error => {
                    window.location.replace('http://localhost:3000/ApiError');
                    console.log(error);
                });
        }

        async createUser(authenticate: AuthDTO): Promise<ListUser<AuthDTO>> {
            return await Api.post('User/Create', {...authenticate})
                .then(response => {
                    return response.data;
                }).catch(error => {
                    //window.location.replace('http://localhost:3000/ApiError');
                    console.log(error);
                });
        }
    }