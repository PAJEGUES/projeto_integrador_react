'use client'
import { useRouter } from 'next/navigation'

export default function Marketing(){

    const routerLogin = useRouter();

    return(
        <div>
            <h1>Marketing - Vinicius</h1>
            <button className="btnLogin" onClick={()=> routerLogin.push('/login')}> Entrar </button>
        </div>
    )
}