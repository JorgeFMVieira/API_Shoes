import { MessagingHelper } from "../Models/MessagingHelper";
import { AuthDTO } from "../Models/Auth/AuthDTO";
import { LoginDTO } from "../Models/Auth/LoginDTO";
import { APIService } from "./APIService";

export class AuthService{
    async Login(authentication: LoginDTO): Promise<MessagingHelper<AuthDTO | null>>{
        try{
            var response = await APIService.Axios().post(`${APIService.GetURL()}/authentication/login`, {...authentication},{
                withCredentials: true
            });
            return response.data
        }
        catch(error){
            return new MessagingHelper<AuthDTO | null>(false, "Erro ao fazer login", null);
        }
    }

    async Register(register: AuthDTO): Promise<MessagingHelper<AuthDTO | null>>{
        try{
            var response = await APIService.Axios().post(`${APIService.GetURL()}/authentication/register`, {...register});
            return response.data;
        }catch(error){
            return new MessagingHelper<AuthDTO| null>(false, "Erro ao criar a conta de administrador", null)
        }
    }

    async GetUser() : Promise<MessagingHelper<AuthDTO | null>>{
        try{
            var response = await APIService.Axios().get(`${APIService.GetURL()}/authentication/getUser`,{
                withCredentials: true
            });
            return response.data;

        }catch(error){
            return new MessagingHelper<AuthDTO | null>(false, "Erro a buscar o user", null);
        }
    }

    async Logout() : Promise<MessagingHelper<any>>{
        try{
            var response = await APIService.Axios().post(`${APIService.GetURL()}/authentication/logout`,{},{
                withCredentials: true
            });
            return response.data;
        }catch(error){
            return new MessagingHelper<any>(false, "Erro ao fazer logout", null);
        }
    }

}