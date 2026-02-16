//We created this file taki agar apan baad mai appwrite ki jagah khud ka backend banana chahe toh apan easily bana sake
//Beacuse we are using this file taki apan frontEnd mai directly appwrite use na karen kuch fncs aur chizo ke through use karen taki 
//front end ko bass vo fncs se matlab ho unnke piche kya hora uss se nhi aur voh pich ki chiz apan appwrite se hata kar baad mai khud se bana le
import config from "../config.js";

import {Client,Account,ID} from "appwrite";


export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectID);
        
        this.account= new Account(this.client)
    }

    async createAccount({email,password,name}){
        try {
            const userAccount=await this.account.create({userId:ID.unique(),email:email,password:password,name:name} );
            if(userAccount){
                //Agar user ka account ban jaye toh voh login hi hojaye direct we want this, naki usse register hone ke baad msg jaye "account created pls login"
                return this.login({email,password})
            }
            else{
                return userAccount;
            }

        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession({email:email,password:password});
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }

        return null;
    }

    async logout(){
         
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

const authService= new AuthService   //"authService" apna ek object hai "AuthService" class ka

export default authService;

