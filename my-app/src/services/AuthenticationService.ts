import { Api } from "../providers/api";
import { iProductsList } from "../interfaces/Products/iProductsList";
import { LoginDTO } from "../Models/Auth/LoginDTO";
import { ListUser } from "../interfaces/Authentication/IAuthentication";
    export class AuthenticationService {
        async loginUser(authenticate: LoginDTO): Promise<ListUser<LoginDTO>> {
            return await Api.post('Login', {...authenticate})
                .then(response => {
                    return response.data;
                }).catch(error => {
                    console.log(error);
                    //window.location.replace('http://localhost:3000/ApiError');
                });
        }
    }