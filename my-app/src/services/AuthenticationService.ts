import { Api } from "../providers/api";
import { iProductsList } from "../interfaces/Products/iProductsList";
import { LoginDTO } from "../Models/Auth/LoginDTO";
    export class AuthenticationService {
        async loginUser(authenticate: LoginDTO): Promise<LoginDTO> {
            return await Api.get('Login' + {...authenticate})
                .then(response => {
                    return response.data;
                }).catch(() => {
                    window.location.replace('http://localhost:3000/ApiError');
                });
        }
    }