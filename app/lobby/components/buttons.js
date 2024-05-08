'use client'
import { useRouter } from 'next/navigation'
import "../style.css";

export default function Buttons(){
    
    const routerExit = useRouter()
    const routerOverview = useRouter()
    const routerLocation = useRouter()
    const routerRegister = useRouter()

    return(
        <div className="button-container">
            <button className="btnRegister" onClick={()=> routerRegister.push ('/lobby/register')}> Cadastro </button>
            <button className="btnLocation" onClick={()=> routerLocation.push ('/lobby/maps')}> Localização </button>
            <button className="btnOverview" onClick={()=> routerOverview.push ('/lobby/overview')}> Visão Geral </button>
            <button className="btnExit" onClick={()=> routerExit.push ('/login')}> Sair </button>
        </div>
    )
}


