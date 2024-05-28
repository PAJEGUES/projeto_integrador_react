'use client'
import axios from "axios"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import "./overview.css"

export default function Overview(){

    const routerBack = useRouter();

    const [editando, setEditando] = useState(false);
    const [clienteEditando, setClienteEditando] = useState(null);

    const [filtrar, setFiltrar] = useState(false);
    const [expandir, setExpand] = useState(null);
    const [clientes, setClient] = useState ([]);

    function getClient(){
        axios.get("/api/get_client",{
            headers:{
                'Content-type':'application/json'
            }
        })
        .then(function(response){
            console.log(response)
             setClient(response.data)
        })   
    }

    function deleteClient(id){

        if( confirm("Tem certeza que deseja excluir?") == false )
            return;

        axios.delete("/api/del_client/" + id,{
            headers:{
                'Content-type':'application/json'
            }
        })
        .then(function(response){
            alert("Cliente deletado com sucesso!");
             getClient()
        })   
    }

    function salvarClienteEditado(id) {
        axios.put("/api/put_client/" + id, {
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(function(response) {
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

    useEffect( () => {
        getClient();
    }, []);


    return(
        <div id="overview">
            <h1>Lista de Clientes</h1>
            <button className="btnBack" onClick={()=> routerBack.push('/lobby')}> Voltar </button>

            <br/>  
            <form id='filtro'>

                {
                    filtrar == false &&
                    <button onClick={() => setFiltrar (true)}>Filtrar</button>
                }
                
                {
                    filtrar == true &&
                    <>
                    <button onClick={() => setFiltrar (false)}>Filtrar </button>
                    <input className='input-name' type="text" placeholder="Nome do Cliente"/>
                    <br/>
                    <input className='rua' type="text" placeholder="Rua"/>
                    <input className='bairro' type="text" placeholder="Bairro"/>
                    <input className='dia-pagamento' type="number" placeholder="Dia do pagamento"/>
                    <select className='status-pagamento' name="status do pagamento">
                    <option value="">Status do pagamento</option>
                    <option value="pago">Pago</option>
                    <option value="não_pago">Não Pago</option>
                    </select>
                    <button>Buscar</button>
                    
                    </>
                }
                
            </form>
            
            
            <table className='card'>
                {clientes.map(cliente => (
                    <>
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
                            <tr>
                                <td colSpan="2"><button onClick={() => setExpand(cliente.id)}>Expandir</button></td>
                            </tr>
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
                                            <td colSpan="2"><button>Confirmar pagamento</button></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2"><button>Enviar comprovante</button></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2"><button>Imprimir comprovante</button></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2"><button onClick={() => { setEditando(true); setClienteEditando(cliente.id); }}>Editar</button></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2"><button onClick={() => deleteClient(cliente.id)}>Excluir</button></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2"><button onClick={() => setExpand(null)}>Ocultar</button></td>
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
                    </>
                ))}
            </table>
            
        </div>
    )
}