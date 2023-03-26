import { user } from "./Iuser";

export class Account implements user{
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    user_id: number;
    user_token: string;

    constructor(username: string){
        this.username = username;
    }
}