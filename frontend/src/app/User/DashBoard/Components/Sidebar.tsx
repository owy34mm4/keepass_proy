'use client'

import React from 'react'
import { LogoutButton} from '@/app/Login/Components/AuthComponents';

interface SideBarProps{
  onSelect:(option:string) => void;
}


const Sidebar: React.FC<SideBarProps> = ({onSelect})=>{
return (
  <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      <h2 className="text-xl font-bold p-4 border-b border-gray-700">Menú</h2>
      <button 
        className="p-4 hover:bg-gray-700 text-left"
        onClick={() => onSelect("passwords")}
      >
        Contraseñas
      </button>
      <button 
        className="p-4 hover:bg-gray-700 text-left"
        onClick={() => onSelect("settings")}
      >
        Configuración
      </button>
      <LogoutButton />
    </div>
  );

}

export default Sidebar