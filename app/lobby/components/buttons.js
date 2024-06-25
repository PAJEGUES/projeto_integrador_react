'use client'
import { useRouter } from 'next/navigation'
import "../style.css";

export default function Buttons(){
    
    const router = useRouter();

    return(
        <div className="button-container">
            <div className="button-wrapper">
                <button id="btnRegister" onClick={()=> router.push('/lobby/register')}> Cadastrar </button>
                <button id="btnLocation" onClick={()=> router.push('/lobby/payment')}> Pagamento </button>
                <button id="btnOverview" onClick={()=> router.push('/lobby/overview')}> Visão Geral </button>
                <button id="btnExit" onClick={()=> router.push('/login')}> Sair </button>
            </div>
        </div>
    )
}
