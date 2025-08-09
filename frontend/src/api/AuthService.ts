//Importamos la libreria AXIOS, que nos permite hacer peticiones
import {axiosAuthInstance} from "./axiosInstances/axiosInstances";

export default class AuthService{
    private static api=axiosAuthInstance;

    static async login(user:string,psw:string){ 
        try{
            const response= await this.api.post("/login",{
                user,
                psw
            },{withCredentials:true});
            return response.data;
        }catch (error:any){
            throw new Error(error.response?.data?.mensaje || "Error en el Login")
        }
    }

    static async logout(){
        try{
            const response = await this.api.post("/logout",{},{withCredentials:true});
            return response.data.msg
        }catch(error:any){
            throw new Error (error.response?.data?.mensaje || "Error al cerrar sesion")
        }
    }
}