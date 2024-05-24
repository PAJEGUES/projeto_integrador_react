'use client'
import './style.css'
import { useRouter } from 'next/navigation'
import axios from "axios"
import { useState,useEffect } from "react";



export default function Login(){
    const[email, alteraEmail] = useState("")
    const[senha, alteraSenha] = useState("")

    function autenticaUsuario(){
      const usuario={
        email:email,
        senha:senha
      }  

      axios.post("/api/login", usuario, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response) => {
        console.log(response);
    })

    }

    const routerBack = useRouter();
    

return(
    <div class="main-login">
        <div class="left-login">
            <h1 >Faça Login<br/>E entre para o nosso time de SEGURANÇA</h1>
            <img src="security-on-animate.svg" class="left-login-image" alt="night guard animação"></img>
        </div>
        <div class="right-login">
            <div class="card-login">
                <div class='textfield'>
                    <label for="usuario">Usuário: </label>
                    <input onChange={(evento)=>alteraEmail(evento.target.value)} type="text" name="usuario" placeholder=""></input>
                </div>
               
                <div class='textfield'>
                    <label for="senha">Senha: </label>
                    <input onChange={(evento)=>alteraSenha(evento.target.value)} type="password" name="senha" placeholder=""></input>
                </div>
                <br></br>
                <br></br>
            </div>
            
            <button class="btnLogin" onClick={()=> autenticaUsuario()}> Login </button>
            <br></br>
            
            <button class="btnBack" onClick={()=> routerBack.push('/')}> Página Inicial </button>
        </div>
    </div>
    
    )
}