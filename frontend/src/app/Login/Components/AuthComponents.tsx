'use client';

import { useState } from "react";
import AuthService from "@/api/AuthService";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function LoginForm() {

    const [usuario,setUsuario]= useState("");
    const [contraseña,setContraseña]= useState("");
    const [mensaje,setMensaje]= useState("");
    const [loading,setLoading]= useState(false);
    const [error,setError]= useState("");
     const router= useRouter();

    const handleLogin = async (e:React.FormEvent)=>{
        e.preventDefault();
        setLoading(true);
        setMensaje("");
        setError("");

        try{
            const response= await AuthService.login(usuario,contraseña);
            setMensaje(response.msg);
            if(response.ret){
               
                router.push("/User/DashBoard");
            }
            setTimeout(()=>{})
        
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

// 🔹 Función que solo hace el logout en el backend y borra token
export async function logoutUser(): Promise<void> {
  await AuthService.logout();
  localStorage.removeItem("token");
}

// 🔹 Componente con el hook useRouter
export function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    setError("");
    try {
      await logoutUser();
      router.push("/"); // Redirección solo aquí
    } catch (err: any) {
      setError(err.message || "Error al cerrar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleLogout}
        disabled={loading}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        {loading ? "Cerrando sesión..." : "Cerrar sesión"}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </>
  );
}