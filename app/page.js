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
                <div className="logo-container">
                    <div className="logo-circle">
                        <span className="logo-letters">S<span className="logo-h">H</span></span>
                    </div>
                    <div className="logo">Safe<span>House.</span></div>
                </div>
                <ul className="nav__list">
                    <button className="btn btn-1" onClick={() => router.push('/login')}>Login</button>
                </ul>
            </nav>

            <div className="title-section">
                <h1>Proteja seu Patrimônio com SafeHouse</h1>
                <p>Segurança e tranquilidade garantidas para você e sua família.</p>
            </div>

            <div className="info-section">
                <div className="info-boxes">
                    <div className="info-box">
                        <img src="https://cdn-icons-png.flaticon.com/512/69/69544.png" alt="Sobre" />
                        <h3>Sobre</h3>
                        <p>Empresa focada em Segurança Patrimonial.</p>
                    </div>
                    <div className="info-box">
                        <img src="https://png.pngtree.com/png-clipart/20230417/original/pngtree-experiance-line-icon-png-image_9063162.png" alt="Experiência" />
                        <h3>Experiência</h3>
                        <p>Há 1 ano levando segurança e tranquilidade para seu lar.</p>
                    </div>
                    <div className="info-box">
                        <img src="https://cdn-icons-png.flaticon.com/512/3937/3937026.png" alt="Qualidade" />
                        <h3>Qualidade</h3>
                        <p>Equipe profissional totalmente capacitada e focada para desempenhar as atividades.</p>
                    </div>
                </div>
            </div>

            <div className="history-section">
                <div className="history-box">
                    <h3>História da Empresa</h3>
                    <p>Empresa criada em Outubro de 2023 com o foco em elevar o padrão de Segurança Patrimonial.</p>
                </div>
            </div>

            <div className="admin-team-section">
                <div className="admin-team">
                    <h2>Administradores</h2>
                    <div className="team-members">
                        <div className="team-member">
                            <img src="ailson.jpg" alt="Ailson" />
                            <p>Ailson</p>
                        </div>
                        <div className="team-member">
                            <img src="alef.jpg" alt="Alef" />
                            <p>Alef</p>
                        </div>
                        <div className="team-member">
                            <img src="jose.jpg" alt="José" />
                            <p>José</p>
                        </div>
                        <div className="team-member">
                            <img src="rogerio.jpg" alt="Rogério" />
                            <p>Rogério</p>
                        </div>
                        <div className="team-member">
                            <img src="vinicius.jpg" alt="Vinicius" />
                            <p>Vinicius</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='contact-section'>
                <h2>Entre em contato para ser um Guarda Noturno</h2>
                <form className="contact-form">
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" id="nome" name="nome" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endereco">Endereço</label>
                        <input type="text" id="endereco" name="endereco" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cidade">Cidade</label>
                        <select id="cidade" name="cidade" required>
                            <option value="Sao Carlos">São Carlos</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-2">Enviar</button>
                </form>
                <iframe className="map-frame" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3698.6483072294013!2d-47.89397872384746!3d-22.024782579885667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b87722afe006bb%3A0x4a8b254e7543696!2sSenac%20S%C3%A3o%20Carlos!5e0!3m2!1sen!2sbr!4v1715387405233!5m2!1sen!2sbr" width="600" height="450" loading="lazy"></iframe>
            </div>

            <div className='footer'>
                <div className="footer-content">
                    <div className="footer-item">
                        <img src="https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-user-icon-png-image_1796659.jpg" alt="Usuários" />
                        <h2>{UsuariosCadastrados} Administradores do Sistema</h2>
                    </div>
                    <div className="footer-item">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRcHCnWHV9SNvy1Atkkp3vPmmy4Rz4Ey4xI4iAwjj6-5xCazIGSdAUA_IbbLlnjbVlHqk&usqp=CAU" alt="Guardas" />
                        <h2>{GuardasPatrulha} Guardas Noturnos em Operação</h2>
                    </div>
                    <div className="footer-item">
                        <img src="https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-vector-house-icon-png-image_695726.jpg" alt="Moradores" />
                        <h2>{Moradores} Moradores Cadastrados</h2>
                    </div>
                </div>
            </div>
        </section>
    );
}
