'use client'
import axios from "axios"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import "./overview.css"

export default function Overview(){

    const routerBack = useRouter();

    const [expandir, alteraExpandir] = useState(false);
    const [nomeCliente, alteraNomeCliente] = useState("");
    const [rua, alteraRua] = useState("");
    const [bairro, alteraBairro] = useState("");
    const [diaPagamento, alteraDiaPagamento] = useState("");
    const [statusPagamento, alteraStatusPagamento] = useState("");
    const [clientes, alterarClientes] = useState ([]);

    function buscarClientes(){
        // axios.get("http://10.60.46.36:5000/get_administrators").then(function(response){
        //     alterarClientes(response.data)
        // })

        alterarClientes([
            {
              "id": 1,
              "name": "Ailson",
              "road": "José hildebrand",
              "number": "1068",
              "neighborhood": "Itamaraty",
              "contact": "981852003",
              "paymentamount": "50",
              "dateofpayment": "10",
              "formofpayment": "PIX" 
            },
            {
              "id": 2,
              "login": "ailson"
            },
            {
              "id": 3,
              "login": "ailson"
            },
            {
              "id": 4,
              "login": "ailson"
            },
            {
              "id": 5,
              "login": "ailson"
            },
            {
              "id": 6,
              "login": "ailson"
            },
            {
              "id": 30,
              "login": "jose@email.com"
            },
            {
              "id": 31,
              "login": "jose@email.com"
            },
            {
              "id": 50,
              "login": "adm"
            },
            {
              "id": 100,
              "login": "jose@email.com"
            }
          ]);

    }

    useEffect( () => {
        buscarClientes();
    }, []);


    function filtro(event){
        event.preventDefault();
   
    }

    

    return(
        <div>
            <h1>Lista de Clientes</h1>
            <button className="btnBack" onClick={()=> routerBack.push('/lobby')}> Voltar </button>

            <br/>
            <form id='filtro'>
                
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
                <button>Confirmar</button>
            </form>
            
            
            <table className='card'>

                

                {
                clientes.map( c => {
                    return <>
                             <tr>
                                <th colSpan={2}>Nome</th>
                                <td colSpan={2} >{c.name}</td>
                            </tr>
                            
                            <tr>
                                <th>Rua</th>
                                <td colSpan={2}>{c.road}</td>
                            </tr>

                            {
                                expandir == false &&
                                <tr >
                                    <td colspan="2"><button onClick={()=> alteraExpandir (true)}>Expandir</button></td>
                                </tr>
                            }
                        </>
                    })
                }

                
                
                {
                    expandir == true &&
                

                    <>
                        <tr>
                            <th>N°</th>
                            <td>{c.number}</td>
                        </tr>
                        
                        <tr>
                            <th>Bairro</th>
                            <td>{c.neighborhood}</td>
                        </tr>
                        
                        <tr>
                            <th>Contato</th>
                            <td>{c.contact}</td>
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
                            <td colspan="2"><button>Editar</button></td>
                        </tr>

                        <tr>
                            <td colspan="2"><button>Excluir</button></td>
                        </tr>
                        
                        <tr>
                            <td colspan="2"><button onClick={()=> alteraExpandir (false)}>Ocultar</button></td>
                        </tr>

                        
                    </>
                }
                    

            </table>

            
        </div>
    )
}