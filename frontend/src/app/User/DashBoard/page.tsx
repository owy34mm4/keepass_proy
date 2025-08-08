'use client'

import React, { use } from 'react'
import { useState } from 'react'
import Sidebar from './Components/Sidebar'
import PasswordList, {PasswordItem} from './Components/PasswordList'
import { LogoutButton } from '@/app/Login/Components/AuthComponents'

const DashBoard: React.FC =()=>{
    const [selected,setSelected] = useState<string>('')

    const passwords: PasswordItem[] = [
    { title: "Gmail", user_name: "juan@example.com", password: "1234", url:"gugu",notes:"fsfsf" },
    { title: "Gmail", user_name: "juan@example.com", password: "1234", url:"gugu",notes:"fsfsf" },
    { title: "Gmail", user_name: "juan@example.com", password: "1234", url:"gugu",notes:"fsfsf" }
  ];
  const renderContent= ()=>{
    switch(selected){
        case "passwords":
            return <PasswordList passwords={passwords} />
        case "settings":
            return(
                 <div className="p-4">
                    <h2 className="text-2xl font-bold">Configuración</h2>
                    <p>Opciones de configuración aquí...</p>
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

