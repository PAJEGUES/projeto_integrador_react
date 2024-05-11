'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react';
import "./overview.css"

export default function Overview(){

    const routerBack = useRouter();

    const [expandir, alteraExpandir] = useState(false);
    const [nomeCliente, alteraNomeCliente] = useState("");
    const [rua, alteraRua] = useState("");
    const [bairro, alteraBairro] = useState("");
    const [diaPagamento, alteraDiaPagamento] = useState("");
    const [statusPagamento, alteraStatusPagamento] = useState("");

    function filtro(event){
        event.preventDefault();
   
    }

    

    return(
        <div>
            <h1>Visao Geral - Ailson</h1>
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
                <button onClick={()=> alert("clicou")}>Confirmar</button>
            </form>
            
            
            <table className='card' border="true">

                <>
                <tr>
                    
                    <td colSpan={2}>Ailson Pereira de Lima </td>
                    
                </tr>
                
                <tr>
                    <th>Rua</th>
                    <td colSpan={2}>José Hildebrand</td>
                </tr>

                {
                    expandir == false &&
                    <tr >
                        <td colspan="2"><button onClick={()=> alteraExpandir (true)}>Expandir</button></td>
                    </tr>
                }
                </>
                
                {
                    expandir == true &&
                

                    <>
                        <tr>
                        <th>N°</th>
                        <td>1068</td>
                        </tr>
                        
                        <tr>
                            <th>Bairro</th>
                            <td>Itamaraty</td>
                        </tr>
                        
                        <tr>
                            <th>Telefone</th>
                            <td>(16) 98165-3678</td>
                        </tr>
                        
                        <tr>
                            <th>Valor do pagamento</th>
                            <td>R$20</td>
                        </tr>
                        
                        <tr>
                            <th>Dia do pagamento</th>
                            <td>10</td>
                        </tr>
                        
                        <tr>
                            <th>Forma do pagamento</th>
                            <td>Pix</td>
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
                            <td colspan="2"><button onClick={()=> alteraExpandir (false)}>Ocultar</button></td>
                        </tr>

                        
                    </>
                }
                    

            </table>

            <table className='card' border="true">

                <>
                <tr>
                    
                    <td colSpan={2}>Lorena Pereira Machado </td>
                    
                </tr>
                
                <tr>
                    <th>Rua</th>
                    <td colSpan={2}>7 de Setembro</td>
                </tr>

                {
                    expandir == false &&
                    <tr >
                        <td colspan="2"><button onClick={()=> alteraExpandir (true)}>Expandir</button></td>
                    </tr>
                }
                </>
                
                {
                    expandir == true &&
                

                    <>
                        <tr>
                        <th>N°</th>
                        <td>1068</td>
                        </tr>
                        
                        <tr>
                            <th>Bairro</th>
                            <td>Itamaraty</td>
                        </tr>
                        
                        <tr>
                            <th>Telefone</th>
                            <td>(16) 98165-3678</td>
                        </tr>
                        
                        <tr>
                            <th>Valor do pagamento</th>
                            <td>R$20</td>
                        </tr>
                        
                        <tr>
                            <th>Dia do pagamento</th>
                            <td>10</td>
                        </tr>
                        
                        <tr>
                            <th>Forma do pagamento</th>
                            <td>Pix</td>
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
                            <td colspan="2"><button onClick={()=> alteraExpandir (false)}>Ocultar</button></td>
                        </tr>

                        
                    </>
                }
            </table>

            <table className='card' border="true">

                <>
                <tr>
                    
                    <td colSpan={2}>Maria Luisa Camargo </td>
                    
                </tr>
                
                <tr>
                    <th>Rua</th>
                    <td colSpan={2}>15 de Novembro</td>
                </tr>

                {
                    expandir == false &&
                    <tr >
                        <td colspan="2"><button onClick={()=> alteraExpandir (true)}>Expandir</button></td>
                    </tr>
                }
                </>
                
                {
                    expandir == true &&
                

                    <>
                        <tr>
                        <th>N°</th>
                        <td>1068</td>
                        </tr>
                        
                        <tr>
                            <th>Bairro</th>
                            <td>Itamaraty</td>
                        </tr>
                        
                        <tr>
                            <th>Telefone</th>
                            <td>(16) 98165-3678</td>
                        </tr>
                        
                        <tr>
                            <th>Valor do pagamento</th>
                            <td>R$20</td>
                        </tr>
                        
                        <tr>
                            <th>Dia do pagamento</th>
                            <td>10</td>
                        </tr>
                        
                        <tr>
                            <th>Forma do pagamento</th>
                            <td>Pix</td>
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
                            <td colspan="2"><button onClick={()=> alteraExpandir (false)}>Ocultar</button></td>
                        </tr>

                        
                    </>
                }
            </table>

            <table className='card' border="true">

                <>
                <tr>
                    
                    <td colSpan={2}>André Oliveira Filho</td>
                    
                </tr>
                
                <tr>
                    <th>Rua</th>
                    <td colSpan={2}>Tiradentes</td>
                </tr>

                {
                    expandir == false &&
                    <tr >
                        <td colspan="2"><button onClick={()=> alteraExpandir (true)}>Expandir</button></td>
                    </tr>
                }
                </>
                
                {
                    expandir == true &&
                

                    <>
                        <tr>
                        <th>N°</th>
                        <td>1068</td>
                        </tr>
                        
                        <tr>
                            <th>Bairro</th>
                            <td>Itamaraty</td>
                        </tr>
                        
                        <tr>
                            <th>Telefone</th>
                            <td>(16) 98165-3678</td>
                        </tr>
                        
                        <tr>
                            <th>Valor do pagamento</th>
                            <td>R$20</td>
                        </tr>
                        
                        <tr>
                            <th>Dia do pagamento</th>
                            <td>10</td>
                        </tr>
                        
                        <tr>
                            <th>Forma do pagamento</th>
                            <td>Pix</td>
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
                            <td colspan="2"><button onClick={()=> alteraExpandir (false)}>Ocultar</button></td>
                        </tr>

                        
                    </>
                }
            </table>

            <table className='card' border="true">

                <>
                <tr>
                    
                    <td colSpan={2}>Marcelo Santos da Silva </td>
                    
                </tr>
                
                <tr>
                    <th>Rua</th>
                    <td colSpan={2}>Primavera</td>
                </tr>

                {
                    expandir == false &&
                    <tr >
                        <td colspan="2"><button onClick={()=> alteraExpandir (true)}>Expandir</button></td>
                    </tr>
                }
                </>
                
                {
                    expandir == true &&
                

                    <>
                        <tr>
                        <th>N°</th>
                        <td>1068</td>
                        </tr>
                        
                        <tr>
                            <th>Bairro</th>
                            <td>Itamaraty</td>
                        </tr>
                        
                        <tr>
                            <th>Telefone</th>
                            <td>(16) 98165-3678</td>
                        </tr>
                        
                        <tr>
                            <th>Valor do pagamento</th>
                            <td>R$20</td>
                        </tr>
                        
                        <tr>
                            <th>Dia do pagamento</th>
                            <td>10</td>
                        </tr>
                        
                        <tr>
                            <th>Forma do pagamento</th>
                            <td>Pix</td>
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
                            <td colspan="2"><button onClick={()=> alteraExpandir (false)}>Ocultar</button></td>
                        </tr>

                        
                    </>
                }
            </table>
        </div>
    )
}