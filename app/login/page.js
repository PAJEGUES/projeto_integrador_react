'use client'
import { useRouter } from 'next/navigation'

export default function Login(){
    <meta charset="UTF-8"></meta>
    const routerLogin = useRouter();
    const routerBack = useRouter();
    <link rel="stylesheet" href="style.css"></link>

return(
    <div class="main-login">
        <div class="left-login">
            <h1>Faça Login<br/>E entre para o nosso time de SEGURANÇA</h1>
            <img src="security-on-animate.svg" class="left-login-image" alt="night guard animação"></img>
        </div>
        <div class="right-login">
            <div class="card-login">
                <div class='textfield'>
                    <label for="usuario">Usuário</label>
                    <input type="text" name="usuario" placeholder="Usuário"></input>
                </div>
               
                <div class='textfield'>
                    <label for="senha">Senha</label>
                    <input type="password" name="senha" placeholder="Senha"></input>
                </div>
            </div>


            <button className="btnLogin" onClick={()=> routerLogin.push('/lobby')}> Login </button>
            <button className="btnBack" onClick={()=> routerBack.push('/')}> Página Inicial </button>
        </div>
    </div>
    
    )
}