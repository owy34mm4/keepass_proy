'use client'

import React, { use } from 'react'
import { useState, useEffect } from 'react'
import Sidebar from './Components/Sidebar'
import PasswordList, {PasswordItem} from './Components/PasswordList'
import { LogoutButton } from '@/app/Login/Components/AuthComponents'
import UserService from '@/api/UserService'
import Configuration from './Components/ConfigurationSelect/Configuration'


const DashBoard: React.FC =()=>{
    const [selected, setSelected] = useState<string>('');
    const [passwords, setPasswords] = useState<PasswordItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
    if (selected === 'passwords') {
      fetchPasswords();
    }
  }, [selected]);

    async function fetchPasswords(){
    setLoading(true);
    setError('');
    try{
      const data = await UserService.getPasswords()
      setPasswords(data)
    } catch(error:any){
  setError(error.message || "Error al obtener contraseñas");
    }finally{
      setLoading(false)
    }
    }
    const passwordsList: PasswordItem[] = [
    { title: "Gmail", user_name: "juan@example.com", password: "1234", url:"gugu",notes:"fsfsf" },
    { title: "Gmail", user_name: "juan@example.com", password: "1234", url:"gugu",notes:"fsfsf" },
    { title: "Gmail", user_name: "juan@example.com", password: "1234", url:"gugu",notes:"fsfsf" }
  ];
  const renderContent= ()=>{
    switch(selected){
        case "passwords":
            
            return <PasswordList passwords={passwords} />
        case "settings":
            return(<div>
                 <Configuration />
                </div>
            );
        case "logout":
            return <LogoutButton />

        default:
            return null
    }
  };
  return (
    <div className="flex h-screen">
      <Sidebar onSelect={setSelected} />
      <main className="flex-1 bg-gray-100 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

export default  DashBoard;

