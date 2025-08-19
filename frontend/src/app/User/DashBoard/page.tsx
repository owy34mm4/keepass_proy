'use client'

import React, { use } from 'react'
import { useState, useEffect } from 'react'
import Sidebar from './Components/Sidebar'
import PasswordList, { PasswordItem } from './Components/PasswordsModule/PasswordsModule'
import { LogoutButton } from '@/app/Login/Components/AuthComponents'
import UserService from '@/api/UserService'
import Configuration from './Components/ConfigurationModule/ConfigurationModule'


const DashBoard: React.FC = () => {
  const [selected, setSelected] = useState<string>('');
  const [passwords, setPasswords] = useState<PasswordItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchPasswords() {
    setLoading(true);
    setError('')
    try {
      const data = await UserService.getPasswords()
      setPasswords(data as PasswordItem[])
    } catch (error: any) {
      setError(error.message || "Error al obtener contraseñas");
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: number) {
    await UserService.deletePasswordById(id);
    fetchPasswords();
  };

  async function handleEdit(id: number, data: Partial<PasswordItem>) {
    await UserService.updatePasswordById(id, data);
    fetchPasswords();
  };
  async function handleAdd(data: Partial<PasswordItem>) {
    console.log(data)
    await UserService.addPassword(data);
    fetchPasswords();
  };

  useEffect(() => {
    if (selected === 'passwords') {
      fetchPasswords();
    }
  }, [selected]);

  const renderContent = () => {
    switch (selected) {
      case "passwords":
        return loading ? "Cargando..." : <PasswordList passwords={passwords} onDelete={handleDelete} onEdit={handleEdit} onAdd={handleAdd} />
      case "settings":
        return <Configuration />
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

export default DashBoard;

