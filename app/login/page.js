'use client'; // Adicione esta linha no início do arquivo

import './style.css';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useState } from 'react';
import bcrypt from 'bcryptjs';

export default function Login() {
    const [email, alteraEmail] = useState("");
    const [senha, alteraSenha] = useState("");

    const router = useRouter();

    const notificarSucesso = () => {
        toast.success("Usuário autenticado com sucesso!", {
            autoClose: 1000000000 // 5 segundos
        });
    };

    const notificarErro = () => {
        toast.error("Falha ao autenticar o usuário!", {
            autoClose: 1000000000 // 5 segundos
        });
    };

    async function autenticaUsuario(evento) {
        if (evento) {
            evento.preventDefault();
        }

        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(senha, salt);

            const usuario = {
                email: email,
                password: senha
            };

            axios.post("/api/login_nightguard", usuario, {
                headers: {
                    "Content-Type": "application/json",
                    "Token": hash
                }
            })
                .then(() => {
                    notificarSucesso();
                    router.push("/lobby");
                })
                .catch((error) => {
                    console.error(error);
                    
                    axios.post("/api/login", usuario, {
                        headers: {
                            "Content-Type": "application/json",
                            "Token": hash
                        }
                    })
<<<<<<< HEAD
                        .then((response) => {
                            console.log(response);
                            alert("Usuario autenticado com sucesso!");
                            router.push("/lobby");
                        })
                        .catch((error) => {
                            console.error(error);
                            alert("Email ou Senha incorretos...");
=======
                        .then(() => {
                            notificarSucesso();
                            router.push("/lobby");
                        })
                        .catch(() => {
                            notificarErro();
>>>>>>> 65e6200d3d00c41650494ce75bef1a07264acbc8
                        });
                });

        } catch (error) {
            console.error("Erro ao gerar o hash da senha:", error);
            notificarErro();
        }
    }

    function handleHomeClick(event) {
        event.preventDefault();
        router.push('/');
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
                    
                    <div className="home-button-container">
                        <button className="home-button" onClick={handleHomeClick}>Home</button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}
