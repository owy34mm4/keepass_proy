'use client'

import React from 'react'
export interface PasswordItem{
    title: string;
    user_name: string;
    password: string;
    url: string;
    notes: string;
}

interface PasswordListProps{
    passwords: PasswordItem[]
}


const PasswordList: React.FC<PasswordListProps>= ({ passwords}) => {
   return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Contraseñas</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">title</th>
            <th className="p-2 border">user_name</th>
            <th className="p-2 border">password</th>
            <th className="p-2 border">url</th>
            <th className="p-2 border">notes</th>
          </tr>
        </thead>
        <tbody>
          {passwords.map((p, i) => (
            <tr key={i} className="border-b">
              <td className="p-2 border">{p.title}</td>
              <td className="p-2 border">{p.user_name}</td>
              <td className="p-2 border">{p.password}</td>
              <td className="p-2 border">{p.url}</td>
              <td className="p-2 border">{p.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PasswordList