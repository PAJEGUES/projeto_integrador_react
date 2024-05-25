'use client'
import axios from "axios"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import "./overview.css"

export default function Overview(){

    const routerBack = useRouter();

    const [editando, setEditando] = useState(false);

    const [filtrar, setFiltrar] = useState(false);
    const [expandir, setExpand] = useState(null);
    const [nomeCliente, alteraNomeCliente] = useState("");
    const [rua, alteraRua] = useState("");
    const [bairro, alteraBairro] = useState("");
    const [diaPagamento, alteraDiaPagamento] = useState("");
    const [statusPagamento, alteraStatusPagamento] = useState("");
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

                {
                clientes.map( c => {
                    return <>
                             <tr>
                                <td colSpan={2} > { editando ? <input value={c.name}/> : <p>{c.name}</p>} </td>
                            </tr>
                            
                            <tr>
                                <th>Rua</th>
                                <td colSpan={2}>{c.address}</td>
                            </tr>

                            {
                                expandir !== c.id &&
                                <tr >
                                    <td colspan="2"><button onClick={()=> setExpand (c.id)}>Expandir</button></td>
                                </tr>
                            }

                            {
                            expandir === c.id &&

                            <>
                                <tr>
                                    <th>N°</th>
                                    <td>{c.housenumber}</td>
                                </tr>
                                
                                <tr>
                                    <th>Bairro</th>
                                    <td>{c.neighborhood}</td>
                                </tr>
                                
                                <tr>
                                    <th>Contato</th>
                                    <td>{c.telephone}</td>
                                </tr>
                                
                                <tr>
                                    <th>Valor do pagamento</th>
                                    <td>{c.paymentamount}</td>
                                </tr>
                                
                                <tr>
                                    <th>Dia do pagamento</th>
                                    <td>{c.dateofpayment}</td>
                                </tr>
                                
                                <tr>
                                    <th>Forma do pagamento</th>
                                    <td>{c.formofpayment}</td>
                                </tr>
                                
                                <tr>
                                    <td colspan="2"><button>Confirmar pagamento</button></td>
                                </tr>
                                
                                <tr>
                                    <td colspan="2"><button>Enviar comprovante</button></td>
                                </tr>
                                
                                <tr>
                                    <td colspan="2"><button>Imprimir comprovante</button></td>
                                </tr>

                                <tr>
                                    <td colspan="2"><button onClick={() => setEditando (true)}>Editar</button></td>
                                </tr>

                                <tr>
                                    <td colspan="2"><button onClick={() => deleteClient (c.id)}>Excluir</button></td>
                                </tr>
                                
                                <tr>
                                    <td colspan="2"><button onClick={()=> setExpand (null)}>Ocultar</button></td>
                                </tr> 
                            </>
                        }
                        </>
                    
                    })
                }   
            </table>
            
        </div>
    )
}