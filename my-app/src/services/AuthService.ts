import { MessagingHelper } from "../Models/MessaginHelper";
import { AuthDTO } from "../Models/Auth/AuthDTO";
import { LoginDTO } from "../Models/Auth/LoginDTO";
import { APIService } from "./APIService";

export class AuthService{
    async Login(authentication: LoginDTO): Promise<MessagingHelper<AuthDTO | null>>{
        try{
            var response = await APIService.Axios().post(`${APIService.GetURL()}/Login`, {...authentication},{
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
            var response = await APIService.Axios().post(`${APIService.GetURL()}/User/Create`, {...register});
            return response.data;
        }catch(error){
            return new MessagingHelper<AuthDTO| null>(false, "Erro ao criar a conta", null)
        }
    }

    async GetUser() : Promise<MessagingHelper<AuthDTO | null>>{
        try{
            var response = await APIService.Axios().get(`${APIService.GetURL()}/User/GetUser`,{
                withCredentials: true
            });
            return response.data;

        }catch(error){
            return new MessagingHelper<AuthDTO | null>(false, "Erro a buscar o user", null);
        }
    }

    async Logout() : Promise<MessagingHelper<any>>{
        try{
            var response = await APIService.Axios().post(`${APIService.GetURL()}/User/Logout`,{},{
                withCredentials: true
            });
            return response.data;
        }catch(error){
            return new MessagingHelper<any>(false, "Erro ao fazer logout", null);
        }
    }

}