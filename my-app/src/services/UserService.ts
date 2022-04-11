import { MessagingHelper } from "../Models/MessagingHelper";
import { ForgotPasswordDTO } from "../Models/Password/ForgotPasswordDTO";
import { ResetPasswordDTO } from "../Models/Password/ResetPasswordDTO";
import { APIService } from "./APIService";

export class UserService{

    async ForgotPassword(email: ForgotPasswordDTO) : Promise<MessagingHelper<null>>{
        try{
            var result = await APIService.Axios().post(`${APIService.GetURL()}/api/User/ForgotPassword`,{email: email.email});
            return result.data
        }catch(error){
            return new MessagingHelper(false, "Something went wrong", null);
        }
    }   

    async ResetPassword(reset: ResetPasswordDTO) : Promise<MessagingHelper<null>>{
        try{
            var result = await APIService.Axios().post(`${APIService.GetURL()}/api/User/ResetPassword`,{...reset},{
                withCredentials: true
            });
            return result.data;
        }catch(error){
            return new MessagingHelper(false, "Something went wrong", null);
        }
    }
}