import { Api } from "../providers/api";

    export class AuthService{
        async getUser(id: number) {
            return await Api.get('GetById?id=' + id)
                .then(response => {
                    console.log(response.data);
                    return response.data;
                }).catch(() => {
                    window.location.replace('http://localhost:3000/ApiError');
                });
        }
    }