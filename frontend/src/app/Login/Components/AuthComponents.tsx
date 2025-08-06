'use client';

import { useState } from "react";
import AuthService from "@/api/AuthService";

export function LoginForm() {

    const [usuario,setUsuario]= useState("");
    const [contraseña,setContraseña]= useState("");
    const [mensaje,setMensaje]= useState("");
    const [loading,setLoading]= useState(false);
    const [error,setError]= useState("");

    const handleLogin = async (e:React.FormEvent)=>{
        e.preventDefault();
        setLoading(true);
        setMensaje("");
        setError("");

        try{
            const response= await AuthService.login(usuario,contraseña);
            setMensaje(response.msg || "Login Exitoso");
        }catch(err:any){
            setError(err.message);
        }finally{
            setLoading(false)
        }
    };

  return (
    <>
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-4 border rounded shadow space-y-4">
        <h2 className="text.xl font-bold">Iniciar Sesion</h2>
        
        <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e)=>{setUsuario(e.target.value)}}
            className="w-full p-2 border rounded"
            required
        />

        <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e)=>{setContraseña(e.target.value)}}
            className="w-full p-2 border rounded"
            required
        />

        <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
            {loading? "Cargando..." : "Entrar"}
        </button>

        {mensaje && <p className="text-green-600">{mensaje}</p>}
        {error && <p className="text-green-600">{error}</p>}
    </form>
    </>
  )
}

export function LogoutButton(){
    const [loading,setLoading]= useState(false);
    const [error,setError]= useState("");

    const handleLogout=async()=>{
        setLoading(true);
        setError('');
        try{
            await AuthService.logout();
            localStorage.removeItem('token');
        }catch(error:any){
            setError(error.message || "Error al cerar sesion");
        }finally{
            setLoading(false);
        }
    };

    return(
        <>
            <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
                {loading? 'Cerrando Sesion': 'Cerrar Sesion'}
            </button>
            {error && <p className="text-red-600 mt-2">{error}</p>}
        </>
    )
}

