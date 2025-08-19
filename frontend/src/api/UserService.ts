//Importamos la libreria AXIOS, que nos permite hacer peticiones
import { json } from "stream/consumers";
import { axiosUserInstance } from "./axiosInstances/axiosInstances";
import { PasswordItem } from "@/app/User/DashBoard/Components/PasswordsModule/PasswordsModule";
import { stringify } from "querystring";

export default class UserService {
  private static api = axiosUserInstance;

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
  };

  static async changeMasterpass(masterpass: string): Promise<void> {
    await UserService.api.put('/change_masterpass', {
      masterpass
    }, { withCredentials: true }
    );
  };

  static async deletePasswordById (id:number){
    await UserService.api.delete('/delete_data_by_id',{data:{id},withCredentials:true})
  }

  static async updatePasswordById(id:number,updatedData:any){
    console.log(id,updatedData)
    await UserService.api.put('/update_data_by_id',{...updatedData},{withCredentials:true})
  }

  static async addPassword(data:any){
    console.log(data)
    await UserService.api.post('/add_data',{...data},{withCredentials:true})
  }
}