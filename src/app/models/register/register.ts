import { IUser } from "../user/user";

export interface IRegister {
    user:IUser;
    firstName:string;
    lastName:string;
    phoneNumber:string;
}