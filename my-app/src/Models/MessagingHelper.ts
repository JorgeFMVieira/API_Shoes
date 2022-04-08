export class MessagingHelper<T>{
    Success: boolean;
    Message: string;
    Obj: T;
    constructor(Success: boolean, Message: string, Obj: T){
        this.Success = Success;
        this.Message = Message;
        this.Obj = Obj;
    }
}