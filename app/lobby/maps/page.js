'use client'
import { useRouter } from 'next/navigation'

export default function Maps(){

    const routerBack = useRouter();

    return(
        <div>
            <h1>Mapas - Alef</h1>
            <button className="btnBack" onClick={()=> routerBack.push('/lobby')}> Voltar </button>
        </div>
    )
}