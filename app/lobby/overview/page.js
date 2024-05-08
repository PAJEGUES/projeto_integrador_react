'use client'
import { useRouter } from 'next/navigation'
import "./overview.css"

export default function Overview(){

    const routerBack = useRouter();

    return(
        <div>
            <h1>Visao Geral - Ailson</h1>
            <button className="btnBack" onClick={()=> routerBack.push('/lobby')}> Voltar </button>

            <button>Voltar</button>
            <br/>
            <input type="date" placeholder="Data"/>
            <input type="text" placeholder="Nome do Cliente"/>
            <input type="text" placeholder="Rua"/>
            <input type="text" placeholder="Bairro"/>
            <input type="number" placeholder="Dia do pagamento"/>
            <select name="status do pagamento">
                <option value="">Status do pagamento</option>
                <option value="pago">Pago</option>
                <option value="não_pago">Não Pago</option>
            </select>
            <button>Confirmar</button>
            
            
            <table className='card' border="true">
                <tr>
                    <td colSpan={2}>Ailson Pereira de Lima</td>
                </tr>
                
                <tr>
                    <td colSpan={2}>R: José Hildebrand</td>
                </tr>
                
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
                    <th>Confirmar pagamento</th>
                    <td><input type="checkbox" /></td>
                </tr>
                
                <tr>
                    <td colspan="2"><button>Enviar comprovante</button></td>
                </tr>
                
                <tr>   
                    <td colspan="2"><button>Imprimir comprovante</button></td>
                </tr>
            </table>

            

        </div>
    )
}