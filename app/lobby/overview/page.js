'use client'
import { useRouter } from 'next/navigation'

export default function Overview(){

    const routerBack = useRouter();

    return(
        <div>
            <h1>Visao Geral - Ailson</h1>
            <button className="btnBack" onClick={()=> routerBack.push('/lobby')}> Voltar </button>
        </div>
    )
}