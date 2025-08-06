//Importamos la libreria AXIOS, que nos permite hacer peticiones
import {axiosAuthInstance} from "./axiosInstances/axiosAuthInstance";

export default class AuthService{
    private static api=axiosAuthInstance;

    static async login(usuario:string,contraseña:string){ 
        try{
            const response= await this.api.post("/login",{
                usuario,
                contraseña
            });
            return response.data.msj;
        }catch (error:any){
            throw new Error(error.response?.data?.mensaje || "Error en el Login")
        }
    }

    static async logout(){
        try{
            const response = await this.api.post("/logout");
            return response.data.msj
        }catch(error:any){
            throw new Error (error.response?.data?.mensaje || "Error al cerrar sesion")
        }
    }
}