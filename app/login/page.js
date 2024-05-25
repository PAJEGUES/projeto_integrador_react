'use client'
import './style.css'
import { useRouter } from 'next/navigation'
import axios from "axios"
import { useState,useEffect } from "react";



export default function Login(){
    const[email, alteraEmail] = useState("")
    const[senha, alteraSenha] = useState("")

    function autenticaUsuario(evento){
        if(evento)
            evento.preventDefault()

      const usuario={
        email:email,
        password:senha
      }  

      axios.post("/api/login", usuario, {
        headers: {
            "Content-Type": "application/json",
            "Token": "rogerio"
        }
        })
        .then((response) => {
            console.log(response);
            alert("Usuario autenticado com sucesso!")
            routerPainel.push("/lobby")
        })
        .catch ((response) => {
            alert("Email ou Senha incorretos...")
        })

    }

    const routerBack = useRouter();
    const routerPainel = useRouter();
    

return(
    <div class="main-login">
        <div class="left-login">
            <h1 >Faça Login<br/>E entre para o nosso time de SEGURANÇA</h1>
            <img src="security-on-animate.svg" class="left-login-image" alt="night guard animação"></img>
        </div>
        <form class="right-login" onSubmit={(evento)=> autenticaUsuario(evento)}>
            <div class="card-login">
                <div class='textfield'>
                    <label for="usuario">Usuário: </label>
                    <input onChange={(evento)=>alteraEmail(evento.target.value)} type="text" name="usuario" placeholder=""></input>
                </div>
               
                <div class='textfield'>
                    <label for="senha">Senha: </label>
                    <input onChange={(evento)=>alteraSenha(evento.target.value)} type="password" name="senha" placeholder=""></input>
                </div>
            </div>

            <button class="btnInvisivel"> Login </button>  

        </form>
        <div class="button">
            <button class="btnLogin" onClick={()=> autenticaUsuario()}> Login </button>            
            <button class="btnBack" onClick={()=> routerBack.push('/')}> Página Inicial </button>
        </div>
    </div>
    
    )
}