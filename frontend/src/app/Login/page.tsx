'use client'

import { LoginForm, LogoutButton } from "./Components/AuthComponents";

export default function LoginPage(){
    return(
        <main
            className="min-h-screen flex items-center justify-center bg-gray-100"
        >
            <LoginForm />
            

        </main>
    );

}