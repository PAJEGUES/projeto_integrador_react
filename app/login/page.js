'use client'; // Adicione esta linha no início do arquivo

import './style.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import bcrypt from 'bcryptjs';

export default function Login() {
    const [email, alteraEmail] = useState("");
    const [senha, alteraSenha] = useState("");

    const router = useRouter();

    async function autenticaUsuario(evento) {
        if (evento) {
            evento.preventDefault();
        }

        try {
            // Gerar o hash da senha
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(senha, salt);

            const usuario = {
                email: email,
                password: senha
            };

            axios.post("/api/login", usuario, {
                headers: {
                    "Content-Type": "application/json",
                    "Token": hash
                }
            })
                .then((response) => {
                    console.log(response);
                    alert("Usuario autenticado com sucesso!");
                    router.push("/lobby");
                })
                .catch((error) => {
                    console.error(error);
                    alert("Email ou Senha incorretos...");
                });
        } catch (error) {
            console.error("Erro ao gerar o hash da senha:", error);
            alert("Ocorreu um erro ao autenticar. Tente novamente.");
        }
    }

    return (
        <div className="main-login">
            <div className="left-login">
                <img src="security-on-animate.svg" className="left-login-image" alt="night guard animação" draggable="false"></img>
            </div>
            <form className="right-login" onSubmit={autenticaUsuario}>
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
                        <button className="btn-login" type="submit">Login</button>
                        <button className="btn-back" type="reset"> Limpar </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
