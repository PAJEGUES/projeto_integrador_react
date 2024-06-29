'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Importação correta
import Maps from '../maps/page';
import './payment.css';

export default function Overview() {
    const router = useRouter(); // Uso correto do hook

    const [clientes, setClientes] = useState([]);
    const [ruaSelecionada, setRuaSelecionada] = useState('');
    const [ordenarCrescente, setOrdenarCrescente] = useState(true);
    const hoje = new Date().toLocaleDateString(); // Data atual formatada
    const [diaAtual, setDiaAtual] = useState(new Date().getDate().toString());
    const [clienteSelecionando, setClienteSelecionado] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);

    function getClient() {
        axios.get('/api/get_client', {
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => {
            setClientes(response.data);
        });
    }

    useEffect(() => {
        getClient();
    }, []);

    // Get unique streets
    const ruas = [...new Set(clientes.map(cliente => cliente.address))];

    // Filter clients based on selected street and selected payment day
    const clientesFiltrados = clientes.filter(cliente => {
        const today = new Date();
        const isAtrasado = new Date(cliente.dateofpayment) < today && !cliente.pagamentoConfirmado;
        const matchRua = ruaSelecionada === '' || cliente.address === ruaSelecionada;
        const matchData = cliente.dateofpayment.toString() === diaAtual;
        const matchPagamento = !cliente.pagamentoConfirmado;
        
        if (ruaSelecionada === 'Clientes em atraso') {
            return isAtrasado;
        }

        return matchRua && matchData && matchPagamento;
    });

    // Sort clients by house number
    clientesFiltrados.sort((a, b) =>
        ordenarCrescente ? a.housenumber - b.housenumber : b.housenumber - a.housenumber
    );

    // Handle payment confirmation
    function confirmarPagamento(id) {
        const novosClientes = clientes.map(cliente =>
            cliente.id === id ? { ...cliente, pagamentoConfirmado: true } : cliente
        );
        setClientes(novosClientes);
    }

    // Handle new month (reset payment confirmations)
    function resetPagamentos() {
        const novosClientes = clientes.map(cliente =>
            ({ ...cliente, pagamentoConfirmado: false })
        );
        setClientes(novosClientes);
    }

    function fecharModal(){
        setModalAberto(false);
        setClienteSelecionado(null);
    }

    function abriModal(cliente){
        setClienteSelecionado(cliente);
        setModalAberto(true);
    }

    function abrirComprovante(cliente){
        const url = `/lobby/receipt?name=${encodeURIComponent(cliente.name)}&address=${encodeURIComponent(cliente.address)}&housenumber=${encodeURIComponent(cliente.housenumber)}&neighborhood=${encodeURIComponent(cliente.neighborhood)}&phone=${encodeURIComponent(cliente.phone)}&telephone=${encodeURIComponent(cliente.telephone)}&paymentamount=${encodeURIComponent(cliente.paymentamount)}&dateofpayment=${encodeURIComponent(hoje)}`;
        router.push(url);
    }

    return (
        <div id="overview">
            <h1>Pagamento</h1>
            
            <div className="top-buttons">
                <button className="btnBack" onClick={() => router.push('/lobby')}>Voltar</button>
                <button className="btnFilters" type="button" onClick={resetPagamentos}>Novo Mês</button>
                <button className="btnNumero" type="button" onClick={() => setOrdenarCrescente(!ordenarCrescente)}>
                    Número {ordenarCrescente ? '▲' : '▼'}
                </button>
            </div>

            <div className="select-filters">
                <select className="rua" value={ruaSelecionada} onChange={(e) => setRuaSelecionada(e.target.value)}>
                    <option value="">Todas as Ruas</option>
                    <option value="Clientes em atraso">Clientes em atraso</option>
                    {ruas.map((rua, index) => (
                        <option key={index} value={rua}>{rua}</option>
                    ))}
                </select>
            </div>

            <div className="inline-filters">
                <div>
                    <label htmlFor="dia-pagamento">Dia: </label>
                    <input
                        type="number"
                        id="dia-pagamento"
                        value={diaAtual}
                        onChange={(e) => setDiaAtual(e.target.value)}
                        min="1"
                        max="31"
                    />
                </div>
            </div>

            <div className="listaClientes">
                {clientesFiltrados.map(cliente => (
                    <div key={cliente.id} className="card">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Nome:</td>
                                    <td>{cliente.name}</td>
                                </tr>
                                <tr>
                                    <td>Endereço:</td>
                                    <td>{cliente.address}</td>
                                </tr>
                                <tr>
                                    <td>Numero da Casa:</td>
                                    <td>{cliente.housenumber}</td>
                                </tr>
                                <tr>
                                    <td>Bairro:</td>
                                    <td>{cliente.neighborhood}</td>
                                </tr>
                                <tr>
                                    <td>Telefone:</td>
                                    <td>{cliente.phone}</td>
                                </tr>
                                <tr>
                                    <td>Telefone:</td>
                                    <td>{cliente.telephone}</td>
                                </tr>
                                <tr>
                                    <td>Valor do Pagamento:</td>
                                    <td>R${cliente.paymentamount}</td>
                                </tr>
                                <tr>
                                    <td>Data de Pagamento:</td>
                                    <td>{cliente.dateofpayment}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="button-group">
                            <button className="btnConfirmar" type="button" onClick={() => confirmarPagamento(cliente.id)}>Confirmar Pagamento</button>
                            <button className="btnComprovante" type="button" onClick={() => abrirComprovante(cliente)}>Comprovante</button>
                            <button className="btnMapa" type="button" onClick={() => abriModal(cliente)}>Mapa</button>
                        </div>
                    </div>
                ))}
            </div>

            {modalAberto && (
                <div className="modal">
                    <div className="mapaModal">
                        <button onClick={fecharModal}>X</button>
                        <Maps cliente={clienteSelecionando}/>
                    </div>
                </div>
            )}
        </div>
    );
}
