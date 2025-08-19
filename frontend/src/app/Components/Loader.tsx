'use client'
import React from 'react'

interface LoaderProps{
    message?: string
}

const Loader:React.FC<LoaderProps> = ({ message='Cargando ...' }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-lg">
        {/* Spinner animado */}
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-700 font-semibold">{message}</p>
      </div>
    </div>
  );
}

export default Loader