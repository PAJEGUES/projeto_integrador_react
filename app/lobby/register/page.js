'use client'
import { useRouter } from 'next/navigation'

export default function Register(){

    const routerBack = useRouter();

    return(
        <div>
            <h1>Registro - José</h1>
            <button className="btnBack" onClick={()=> routerBack.push('/lobby')}> Voltar </button>
        </div>
    )
}