'use client'
import { useRouter } from 'next/navigation'
import RegistrationData from './components/registration_data';

export default function Register(){

    const routerBack = useRouter();

    return(
        <div>
            <h1>Registro - José</h1>
            <RegistrationData/>
            <div className='button-container'>
                <button onClick={()=> routerBack.push('/lobby')}> Voltar </button>
                <button onClick={()=> routerBack.push('/')}> Limpar </button>
                <button onClick={()=> routerBack.push('/')}> Cadastrar </button>
            </div>
        </div>
    )
}