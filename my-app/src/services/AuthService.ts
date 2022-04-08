import { MessagingHelper } from "../Models/MessagingHelper";
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
            return new MessagingHelper<AuthDTO | null>(false, "We weren´t able to sign you in.", null);
        }
    }

    async Register(register: AuthDTO): Promise<MessagingHelper<AuthDTO | null>>{
        try{
            var response = await APIService.Axios().post(`${APIService.GetURL()}/Register?Email=` + register.email + `&Password=` + register.password + `&Username=` + register.username);
            return response.data;
        }catch(error){
            console.log(error);
            return new MessagingHelper<AuthDTO| null>(false, "We weren´t able to create the account.", null)
        }
    }

    async GetUser() : Promise<MessagingHelper<AuthDTO | null>>{
        try{
            var response = await APIService.Axios().get(`${APIService.GetURL()}/GetUser`,{
                withCredentials: true
            });
            return response.data;

        }catch(error){
            return new MessagingHelper<AuthDTO | null>(false, "We couldn´t find the user", null);
        }
    }

    async Logout() : Promise<MessagingHelper<any>>{
        try{
            var response = await APIService.Axios().post(`${APIService.GetURL()}/Logout`,{},{
                withCredentials: true
            });
            return response.data;
        }catch(error){
            return new MessagingHelper<any>(false, "We couldn´t sign you out.", null);
        }
    }

}