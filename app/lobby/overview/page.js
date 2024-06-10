'use client'
import axios from "axios"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import "./overview.css"

export default function Overview() {
    const routerBack = useRouter();

    const [editando, setEditando] = useState(false);
    const [clienteEditando, setClienteEditando] = useState(null);

    const [filtrar, setFiltrar] = useState(false);
    const [expandir, setExpand] = useState(null);
    const [clientes, setClient] = useState([]);
    const [clientesFiltrados, setClientesFiltrados] = useState([]);

    const [nomeFiltro, setNomeFiltro] = useState("");
    const [ruaFiltro, setRuaFiltro] = useState("");
    const [bairroFiltro, setBairroFiltro] = useState("");
    const [diaPagamentoFiltro, setDiaPagamentoFiltro] = useState("");

    useEffect(() => {
        getClient();
    }, []);

    useEffect(() => {
        aplicarFiltros();
    }, [nomeFiltro, ruaFiltro, bairroFiltro, diaPagamentoFiltro]);

    function getClient() {
        axios.get("/api/get_client", {
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(function (response) {
                console.log(response)
                setClient(response.data)
                setClientesFiltrados(response.data)
            })
    }

    function deleteClient(id) {
        if (confirm("Tem certeza que deseja excluir?") == false)
            return;

        axios.delete("/api/del_client/" + id, {
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(function (response) {
                alert("Cliente deletado com sucesso!");
                getClient()
            })
    }

    function salvarClienteEditado(id) {
        const clienteEditado = clientes.find(c => c.id === id);
        axios.put("/api/put_client/" + id, clienteEditado, {
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(function (response) {
                alert("Cliente editado com sucesso!");
                getClient();
                setEditando(false);
                setClienteEditando(null);
            })
    }

    function cancelarEdicao() {
        setEditando(false);
        setClienteEditando(null);
        getClient();
    }

    function aplicarFiltros() {
        const clientesFiltrados = clientes.filter(cliente =>
            (nomeFiltro === "" || cliente.name.toLowerCase().includes(nomeFiltro.toLowerCase())) &&
            (ruaFiltro === "" || cliente.address.toLowerCase().includes(ruaFiltro.toLowerCase())) &&
            (bairroFiltro === "" || cliente.neighborhood.toLowerCase().includes(bairroFiltro.toLowerCase())) &&
            (diaPagamentoFiltro === "" || cliente.dateofpayment.toString().includes(diaPagamentoFiltro))
        );
        setClientesFiltrados(clientesFiltrados);
    }

    function limparFiltros() {
        setNomeFiltro("");
        setRuaFiltro("");
        setBairroFiltro("");
        setDiaPagamentoFiltro("");
        setClientesFiltrados(clientes);
    }

    return (
        <div id="overview">
            <h1>Lista de Clientes</h1>
            <button className="btnBack" onClick={() => routerBack.push('/lobby')}>Voltar</button>

            <br />
            <form id='filtro'>
                {
                    filtrar == false &&
                    <button type="button" onClick={() => setFiltrar(true)}>Filtros</button>
                }

                {
                    filtrar == true &&
                    <>
                        <button type="button" onClick={() => setFiltrar(false)}>Filtros</button>
                        <input
                            className='input-name'
                            type="text"
                            placeholder="Nome do Cliente"
                            value={nomeFiltro}
                            onChange={(e) => setNomeFiltro(e.target.value)}
                        />
                        <br />
                        <input
                            className='rua'
                            type="text"
                            placeholder="Rua"
                            value={ruaFiltro}
                            onChange={(e) => setRuaFiltro(e.target.value)}
                        />
                        <input
                            className='bairro'
                            type="text"
                            placeholder="Bairro"
                            value={bairroFiltro}
                            onChange={(e) => setBairroFiltro(e.target.value)}
                        />
                        <input
                            className='dia-pagamento'
                            type="number"
                            placeholder="Dia do pagamento"
                            value={diaPagamentoFiltro}
                            onChange={(e) => setDiaPagamentoFiltro(e.target.value)}
                        />
                        <button type="button" onClick={limparFiltros}>Limpar Filtro</button>
                    </>
                }
            </form>

            <table className='card'>
                {clientesFiltrados.map(cliente => (
                    <React.Fragment key={cliente.id}>
                        <tr>
                            <td colSpan={2}>
                                {editando && clienteEditando === cliente.id ? (
                                    <input
                                        type="text"
                                        value={cliente.name}
                                        onChange={(e) => setClient(clientes.map(c => c.id === cliente.id ? { ...c, name: e.target.value } : c))}
                                    />
                                ) : (
                                    cliente.name
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Rua</th>
                            <td colSpan={2}>
                                {editando && clienteEditando === cliente.id ? (
                                    <input
                                        type="text"
                                        value={cliente.address}
                                        onChange={(e) => setClient(clientes.map(c => c.id === cliente.id ? { ...c, address: e.target.value } : c))}
                                    />
                                ) : (
                                    cliente.address
                                )}
                            </td>
                        </tr>

                        {expandir !== cliente.id &&
                            <>
                                <tr>
                                    <td colSpan="2"><button onClick={() => setExpand(cliente.id)}>Expandir</button></td>
                                </tr>

                                <tr>
                                    <td className="sem_borda" colSpan="2"></td>
                                </tr>
                            </>
                        }

                        {expandir === cliente.id &&
                            <>
                                <tr>
                                    <th>N°</th>
                                    <td>
                                        {editando && clienteEditando === cliente.id ? (
                                            <input
                                                type="text"
                                                value={cliente.housenumber}
                                                onChange={(e) => setClient(clientes.map(c => c.id === cliente.id ? { ...c, housenumber: e.target.value } : c))}
                                            />
                                        ) : (
                                            cliente.housenumber
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Bairro</th>
                                    <td>
                                        {editando && clienteEditando === cliente.id ? (
                                            <input
                                                type="text"
                                                value={cliente.neighborhood}
                                                onChange={(e) => setClient(clientes.map(c => c.id === cliente.id ? { ...c, neighborhood: e.target.value } : c))}
                                            />
                                        ) : (
                                            cliente.neighborhood
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Contato</th>
                                    <td>
                                        {editando && clienteEditando === cliente.id ? (
                                            <input
                                                type="text"
                                                value={cliente.telephone}
                                                onChange={(e) => setClient(clientes.map(c => c.id === cliente.id ? { ...c, telephone: e.target.value } : c))}
                                            />
                                        ) : (
                                            cliente.telephone
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Valor do pagamento</th>
                                    <td>
                                        {editando && clienteEditando === cliente.id ? (
                                            <input
                                                type="text"
                                                value={cliente.paymentamount}
                                                onChange={(e) => setClient(clientes.map(c => c.id === cliente.id ? { ...c, paymentamount: e.target.value } : c))}
                                            />
                                        ) : (
                                            cliente.paymentamount
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Dia do pagamento</th>
                                    <td>
                                        {editando && clienteEditando === cliente.id ? (
                                            <input
                                                type="text"
                                                value={cliente.dateofpayment}
                                                onChange={(e) => setClient(clientes.map(c => c.id === cliente.id ? { ...c, dateofpayment: e.target.value } : c))}
                                            />
                                        ) : (
                                            cliente.dateofpayment
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Forma do pagamento</th>
                                    <td>
                                        {editando && clienteEditando === cliente.id ? (
                                            <input
                                                type="text"
                                                value={cliente.formofpayment}
                                                onChange={(e) => setClient(clientes.map(c => c.id === cliente.id ? { ...c, formofpayment: e.target.value } : c))}
                                            />
                                        ) : (
                                            cliente.formofpayment
                                        )}
                                    </td>
                                </tr>

                                {!editando && (
                                    <>
                                        <tr>
                                            <td colSpan="2"><button onClick={() => { setEditando(true); setClienteEditando(cliente.id); }}>Editar</button></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2"><button onClick={() => deleteClient(cliente.id)}>Excluir</button></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2"><button onClick={() => setExpand(null)}>Ocultar</button></td>
                                        </tr>
                                        <tr>
                                            <td className="sem_borda" colSpan="2"></td>
                                        </tr>
                                    </>
                                )}

                                {editando && clienteEditando === cliente.id && (
                                    <>
                                        <tr>
                                            <td colSpan="2"><button onClick={() => salvarClienteEditado(cliente.id)}>Salvar</button></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2"><button onClick={cancelarEdicao}>Cancelar</button></td>
                                        </tr>
                                    </>
                                )}
                            </>
                        }
                    </React.Fragment>
                ))}
            </table>
        </div>
    )
}
