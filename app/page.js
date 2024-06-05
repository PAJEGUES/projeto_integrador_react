'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import "./globals.css"

export default function Marketing() {
    const router = useRouter();

    const [UsuariosCadastrados, setUsuariosCadastrados] = useState(0);
    const [GuardasPatrulha, setGuardasPatrulha] = useState(0);
    const [Moradores, setMoradores] = useState(0);

    const fetchUsuarios = async () => {
        try {
            const response = await axios.get("/api/get_administrators", { headers: { "Content-Type": "application/json" } });
            setUsuariosCadastrados(response.data.length);
        } catch (error) {
            console.error("Erro ao buscar usuários cadastrados", error);
        }
    };

    const fetchGuardas = async () => {
        try {
            const response = await axios.get("/api/get_nightguard", { headers: { "Content-Type": "application/json" } });
            setGuardasPatrulha(response.data.length);
        } catch (error) {
            console.error("Erro ao buscar guardas de patrulha", error);
        }
    };

    const fetchMoradores = async () => {
      try {
          const response = await axios.get("/api/get_client", { headers: { "Content-Type": "application/json" } });
          setMoradores(response.data.length);
      } catch (error) {
          console.error("Erro ao buscar moradores", error);
      }
  };

    useEffect(() => {
        fetchUsuarios();
        fetchGuardas();
        fetchMoradores();
    }, []);

    return (
        <section className='hero'>
            <nav>
                <div className="logo">Safe<span>House.</span></div>
                <ul className="nav__list">
                    <button className="btn btn-1" onClick={() => router.push('/login')}>Login</button>
                </ul>
            </nav>
            <div className="content">
                <div className="info-boxes">
                    <div className="info-box">
                        <h3>Sobre</h3>
                        <p>Empresa focada em Segurança Patrimonial.</p>
                    </div>
                    <div className="info-box">
                        <h3>Experiência</h3>
                        <p>Há 1 ano levando segurança e tranquilidade para seu lar.</p>
                    </div>
                    <div className="info-box">
                        <h3>Qualidade</h3>
                        <p>Equipe profissional totalmente capacitada e focada para desempenhar as atividades.</p>
                    </div>
                </div>
            </div>
            <div className='footer'>
                <div className="footer-content">
                    <div className="footer-item">
                        <img src="https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-user-icon-png-image_1796659.jpg" alt="Usuários" />
                        <h2>{UsuariosCadastrados} Administradores</h2>
                    </div>
                    <div className="footer-item">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRcHCnWHV9SNvy1Atkkp3vPmmy4Rz4Ey4xI4iAwjj6-5xCazIGSdAUA_IbbLlnjbVlHqk&usqp=CAU" alt="Guardas" />
                        <h2>{GuardasPatrulha} Guardas Noturnos</h2>
                    </div>
                    <div className="footer-item">
                        <img src="https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-vector-house-icon-png-image_695726.jpg" alt="Moradores" />
                        <h2>{Moradores} Moradores</h2>
                    </div>
                </div>
            </div>
        </section>
    );
}
