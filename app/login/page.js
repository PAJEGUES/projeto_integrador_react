'use client'
import { useRouter } from 'next/navigation'

export default function Login(){

    const routerLogin = useRouter();
    const routerBack = useRouter();

    return(
        <div>
            <h1>Login - Rogério</h1>
            <button className="btnLogin" onClick={()=> routerLogin.push('/lobby')}> Entrar </button>
            <button className="btnBack" onClick={()=> routerBack.push('/')}> Página Inicial </button>
        </div>
    )
}