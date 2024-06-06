'use client'
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';


export default function Overview() {

    const routerBack = useRouter();

    const [clientes, setClientes] = useState([]);
    const [ruaSelecionada, setRuaSelecionada] = useState('');
    const [ordenarCrescente, setOrdenarCrescente] = useState(true);
    const [diaAtual, setDiaAtual] = useState(new Date().getDate().toString());
    const [editando, setEditando] = useState(false);
    const [clienteEditando, setClienteEditando] = useState(null);
    const [expandir, setExpandir] = useState(null);

    useEffect(() => {
        getClient();
    }, []);

    function getClient() {
        axios.get("/api/get_client", {
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => {
            setClientes(response.data);
        });
    }

    function deleteClient(id) {
        if (confirm("Tem certeza que deseja excluir?") === false)
            return;

        axios.delete(`http://127.0.0.1:5000/del_client/${id}`, {
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => {
            alert("Cliente deletado com sucesso!");
            getClient();
        });
    }

    function salvarClienteEditado(id) {
        const clienteEditado = clientes.find(c => c.id === id);
        axios.put(`http://127.0.0.1:5000/put_client/${id}`, clienteEditado, {
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => {
            alert("Cliente editado com sucesso!");
            getClient();
            setEditando(false);
            setClienteEditando(null);
        });
    }

    function cancelarEdicao() {
        setEditando(false);
        setClienteEditando(null);
        getClient();
    }

    // Get unique streets
    const ruas = [...new Set(clientes.map(cliente => cliente.address))];

    // Filter clients based on selected street, selected date of payment, and payment confirmation status
    const clientesFiltrados = clientes.filter(cliente => {
        const matchRua = ruaSelecionada === '' || cliente.address === ruaSelecionada;
        const matchData = cliente.dateofpayment === diaAtual;
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

    return (
        <div id="overview">
            <h1>Lista de Clientes</h1>
            <button className="btnBack" onClick={() => routerBack.push('/lobby')}>Voltar</button>

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
                    Ordenar por Número ({ordenarCrescente ? "Crescente" : "Decrescente"})
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
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Rua</th>
                        <th>N°</th>
                        <th>Valor do pagamento</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientesFiltrados.map(cliente => (
                        <tr key={cliente.id}>
                            <td>{editando && clienteEditando === cliente.id ? (
                                <input 
                                    type="text" 
                                    value={cliente.name} 
                                    onChange={(e) => setClientes(clientes.map(c => c.id === cliente.id ? { ...c, name: e.target.value } : c))}
                                />
                            ) : (
                                cliente.name
                            )}</td>
                            <td>{editando && clienteEditando === cliente.id ? (
                                <input 
                                    type="text" 
                                    value={cliente.address} 
                                    onChange={(e) => setClientes(clientes.map(c => c.id === cliente.id ? { ...c, address: e.target.value } : c))}
                                />
                            ) : (
                                cliente.address
                            )}</td>
                            <td>{editando && clienteEditando === cliente.id ? (
                                <input 
                                    type="text" 
                                    value={cliente.housenumber} 
                                    onChange={(e) => setClientes(clientes.map(c => c.id === cliente.id ? { ...c, housenumber: e.target.value } : c))}
                                />
                            ) : (
                                cliente.housenumber
                            )}</td>
                            <td>{editando && clienteEditando === cliente.id ? (
                                <input 
                                    type="text" 
                                    value={cliente.paymentamount} 
                                    onChange={(e) => setClientes(clientes.map(c => c.id === cliente.id ? { ...c, paymentamount: e.target.value } : c))}
                                />
                            ) : (
                                cliente.paymentamount
                            )}</td>
                            <td>
                                {editando && clienteEditando === cliente.id ? (
                                    <>
                                        <button onClick={() => salvarClienteEditado(cliente.id)}>Salvar</button>
                                        <button onClick={cancelarEdicao}>Cancelar</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => { setEditando(true); setClienteEditando(cliente.id); }}>Editar</button>
                                        <button onClick={() => deleteClient(cliente.id)}>Excluir</button>
                                        <button onClick={() => confirmarPagamento(cliente.id)}>Confirmar pagamento</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {clientesFiltrados.length === 0 && (
                <p>Nenhum cliente encontrado para a rua selecionada e o dia de pagamento atual.</p>
            )}
        </div>
    );
}
