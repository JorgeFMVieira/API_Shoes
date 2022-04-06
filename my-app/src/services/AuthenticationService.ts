import { Api } from "../providers/api";
import { iProductsList } from "../interfaces/Products/iProductsList";
    export class AuthenticationService {
        async loginUser(): Promise<iProductsList> {
            return await Api.get('Login', user: strin)
                .then(response => {
                    return response.data;
                }).catch(() => {
                    window.location.replace('http://localhost:3000/ApiError');
                });
        }
    }