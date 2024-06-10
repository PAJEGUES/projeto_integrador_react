import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function Overview() {
    const routerBack = useRouter();

    const [clientes, setClientes] = useState([]);
    const [ruaSelecionada, setRuaSelecionada] = useState('');
    const [ordenarCrescente, setOrdenarCrescente] = useState(true);
    const [diaPagamentoSelecionado, setDiaPagamentoSelecionado] = useState(new Date().getDate().toString());

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

    useEffect(() => {
        getClient();
    }, []);

    // Get unique streets
    const ruas = [...new Set(clientes.map(cliente => cliente.address))];

    // Filter clients based on selected street and selected payment day
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
                            <td>{cliente.name}</td>
                            <td>{cliente.address}</td>
                            <td>{cliente.housenumber}</td>
                            <td>{cliente.paymentamount}</td>
                            <td>
                                <button type="button" onClick={() => confirmarPagamento(cliente.id)}>Confirmar pagamento</button>
                                <button type="button">Enviar comprovante</button>
                                <button type="button">Imprimir comprovante</button>
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
