//Importamos la libreria AXIOS, que nos permite hacer peticiones
import {axiosUserInstance} from "./axiosInstances/axiosInstances";
import { PasswordItem } from "@/app/User/DashBoard/Components/PasswordList";

export default class UserService{
    private static api=axiosUserInstance;

   static async getPasswords(): Promise<PasswordItem[]> {
  const response = await UserService.api.get('/read_all_data', {
    withCredentials: true,
  });

  const data = response.data;

  if (data.ret && typeof data.ret === "object") {
    // Convertir de objeto con claves a array
    return Object.values(data.ret) as PasswordItem[];
  }

  return [];
}

    static async changeMasterpass(masterpass:string):Promise<void> {
        await UserService.api.put('/change_masterpass',{
            masterpass},{withCredentials:true}
        );
    }
}