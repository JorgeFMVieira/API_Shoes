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
            return new MessagingHelper<AuthDTO | null>(false, "Error while trying to sigin", null);
        }
    }

    async Register(register: AuthDTO): Promise<MessagingHelper<AuthDTO | null>>{
        try{
            var response = await APIService.Axios().post(`${APIService.GetURL()}/Register`, {...register});
            return response.data;
        }catch(error){
            return new MessagingHelper<AuthDTO| null>(false, "Error while signinup", null)
        }
    }

    async GetUser() : Promise<MessagingHelper<AuthDTO | null>>{
        try{
            var response = await APIService.Axios().get(`${APIService.GetURL()}/GetUser`,{
                withCredentials: true
            });
            return response.data;

        }catch(error){
            return new MessagingHelper<AuthDTO | null>(false, "Error while searching for user", null);
        }
    }

    async Logout() : Promise<MessagingHelper<any>>{
        try{
            var response = await APIService.Axios().post(`${APIService.GetURL()}/Logout`,{},{
                withCredentials: true
            });
            return response.data;
        }catch(error){
            return new MessagingHelper<any>(false, "Error while signing out", null);
        }
    }

}