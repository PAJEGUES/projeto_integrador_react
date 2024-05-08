'use client'
import { useRouter } from 'next/navigation'

export default function Maps(){

    const routerBack = useRouter();

    return(

        <div class="map-responsive"><iframe src="https://www.google.com/maps/embed?q=Rua+Episcopal+numero+338+São+Carlos,+SP" width="100%" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <h1>Mapas - Alef</h1>
            <button className="btnBack" onClick={()=> routerBack.push('/lobby')}> Voltar </button>
        </div>
    )
}