'use client'; // Adicione esta linha no início do arquivo

import './style.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Login() {
    const [email, alteraEmail] = useState("");
    const [senha, alteraSenha] = useState("");

    function autenticaUsuario(evento) {
        if (evento) {
            evento.preventDefault();
        }

        const usuario = {
            email: email,
            password: senha
        };

        axios.post("/api/login", usuario, {
            headers: {
                "Content-Type": "application/json",
                "Token": "rogerio"
            }
        })
            .then((response) => {
                console.log(response);
                alert("Usuario autenticado com sucesso!");
                routerPainel.push("/lobby");
            })
            .catch((response) => {
                alert("Email ou Senha incorretos...");
            });
    }

    const routerBack = useRouter();
    const routerPainel = useRouter();

    return (
        <div className="main-login">
            <div className="left-login">
                <img src="security-on-animate.svg" className="left-login-image" alt="night guard animação" draggable="false"></img>
            </div>
            <form className="right-login" onSubmit={(evento) => autenticaUsuario(evento)}>
                <div className="card-login">
                    <div className='textfield'>
                        <label htmlFor="usuario">Email: </label>
                        <input onChange={(evento) => alteraEmail(evento.target.value)} type="text" name="usuario" placeholder=""></input>
                    </div>

                    <div className='textfield'>
                        <label htmlFor="senha">Senha: </label>
                        <input onChange={(evento) => alteraSenha(evento.target.value)} type="password" name="senha" placeholder=""></input>
                    </div>

                    <div className="button-group">
                        <button className="btn-login" onClick={() => autenticaUsuario()}>Login</button>
                        <button className="btn-back" type="reset"> Limpar </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
