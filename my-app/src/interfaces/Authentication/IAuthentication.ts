export class ListUser<T> {
    error: boolean;
    errorMsg: string;
    token: string;
    user: T[];

    constructor(error: boolean, errorMsg: string, token: string, user: T[]) {
        this.error  = error;
        this.errorMsg = errorMsg;
        this.token = token;
        this.user = user;
    }
}