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
        const matchRua = ruaSelecionada === '' || cliente.address === ruaSelecionada;
        const matchData = cliente.dateofpayment.toString() === diaAtual;
        const matchPagamento = !cliente.pagamentoConfirmado;
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
            <h1>Lista de Clientes</h1>
            <button className="btnBack" onClick={() => router.push('/lobby')}>Voltar</button>

            <br />

            <div>
                <label htmlFor="listbox-ruas">Selecione a rua:</label>
                <select
                    id="listbox-ruas"
                    value={ruaSelecionada}
                    onChange={(e) => setRuaSelecionada(e.target.value)}
                >
                    <option value="">Todas as ruas</option>
                    {ruas.map((rua, index) => (
                        <option key={index} value={rua}>{rua}</option>
                    ))}
                </select>

                <button
                    type="button"
                    onClick={() => setOrdenarCrescente(!ordenarCrescente)}
                >
                    Ordenar Número ({ordenarCrescente ? "Crescente" : "Decrescente"})
                </button>

                <label htmlFor="dia-pagamento">Selecione o dia de pagamento:</label>
                <input
                    type="number"
                    id="dia-pagamento"
                    value={diaAtual}
                    onChange={(e) => setDiaAtual(e.target.value)}
                    min="1"
                    max="31"
                />

                <button
                    type="button"
                    onClick={resetPagamentos}
                >
                    Novo Mês
                </button>
            </div>

            <table className='card'>
                {clientesFiltrados.map(cliente => (
                    <thead key={cliente.id}>
                        <tr>
                            <th>Nome</th>
                            <td>{cliente.name}</td>
                        </tr>
                        <tr>
                            <th>Rua</th>
                            <td>{cliente.address}</td>
                        </tr>
                        <tr>
                            <th>N°</th>
                            <td>{cliente.housenumber}</td>
                        </tr>
                        <tr>
                            <th>Bairro</th>
                            <td>{cliente.neighborhood}</td>
                        </tr>
                        <tr>
                            <th>Telefone</th>
                            <td>{cliente.telephone}</td>
                        </tr>
                        <tr>
                            <th>Valor do pagamento</th>
                            <td>{cliente.paymentamount}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button type="button" onClick={() => confirmarPagamento(cliente.id)}>Confirmar pagamento</button>
                                <button type="button" onClick={() => abrirComprovante(cliente)}>Comprovante</button>
                                <button type="button" onClick={() => abriModal(cliente)}>Ver no mapa</button>
                            </td>
                        </tr>
                    </thead>
                ))}
            </table>

            {clienteSelecionando && (
                <div className='modal'>
                    <div className="fade" onClick={() => fecharModal()}></div>
                    <div className="mapa">
                        <div className='mapaModal'>
                            <button onClick={() => fecharModal()}>X</button>
                            <Maps cliente={clienteSelecionando} />
                        </div>
                    </div>
                </div>
            )}

            {clientesFiltrados.length === 0 && (
                <p>Nenhum cliente encontrado para a rua selecionada e o dia de pagamento atual.</p>
            )}
        </div>
    );
}
