'use client'
import { useRouter } from 'next/navigation'
import RegistrationData from './components/registration_data';
import "./style.css";

export default function Register(){

    const routerBack = useRouter();

    return(
        <div className='label-container'>
            <h1>Cadastro de Clientes</h1>
            <RegistrationData/>
            <div className='button-container'>
                <button onClick={()=> routerBack.push('/lobby')}> Voltar </button>
                <button onClick={()=> routerBack.push('/')}> Limpar </button>
                <button onClick={()=> routerBack.push('/')}> Cadastrar </button>
            </div>
        </div>
    )
}