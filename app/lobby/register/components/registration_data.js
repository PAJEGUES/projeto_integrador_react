'use client'

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import '../style.css';

const notificarSucesso = () => {
    toast.success("Cliente criado com sucesso!", {
        autoClose: 5000 // 5 segundos
    });
};

const notificarErro = () => {
    toast.error("Falha ao cadastrar o cliente!", {
        autoClose: 5000 // 5 segundos
    });
};

export default function RegistrationData(){

    const [inputName, alteraInputName] = useState("");
    const [inputAddress, alteraInputAdress] = useState("");
    const [inputNumberHouse, alteraInputNumberHouse] = useState("");
    const [inputTelephone, alteraInputTelephone] = useState("");
    const [inputNeighborhood, alteraInputNeighborhood] = useState("");
    const [inputFormPayment, alteraInputFormPayment] = useState("pix");
    const [inputDayPayment, alteraInputDayPayment] = useState("5");
    const [inputValuePayment, alteraInputValuePayment] = useState("");

    const routerBack = useRouter();

    function sendFormulary(e) {
        e.preventDefault();
    
        const formData = {
            name: inputName,
            address: inputAddress,
            housenumber: inputNumberHouse,
            telephone: inputTelephone,
            neighborhood: inputNeighborhood,
            formofpayment: inputFormPayment,
            dateofpayment: inputDayPayment,
            paymentamount: inputValuePayment
        };

        axios.post('/api/post_client', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.status === 201) {
                notificarSucesso();
                alteraInputName("");
                alteraInputAdress("");
                alteraInputNumberHouse("");
                alteraInputTelephone("");
                alteraInputNeighborhood("");
                alteraInputFormPayment("pix");
                alteraInputDayPayment("5");
                alteraInputValuePayment("");
            } else {
                notificarErro();
            }
        })
        .catch(error => {
            console.error('Erro ao enviar formulário:', error);
        });
    }
    
    return (
        <div id="registration-container">
            <div id="container">
                <div id="form-container">
                    <h1 id="title">Cadastro de Clientes</h1>
                    <form id="form" onSubmit={sendFormulary}>
                        <label> Nome </label>
                        <input className="input-box" value={inputName} onChange={ (e)=> alteraInputName(e.target.value)} type="text"/>

                        <label> Endereço </label>
                        <input className="input-box" value={inputAddress} onChange= {(e)=> alteraInputAdress(e.target.value)} type="text"/>

                        <label> Número Casa</label>
                        <input className="input-box" value={inputNumberHouse} onChange= {(e)=> alteraInputNumberHouse(e.target.value)} type="number" min="0"/>

                        <label> Telefone </label>
                        <input className="input-box" value={inputTelephone} onChange= {(e)=> alteraInputTelephone(e.target.value)} type="number" min="0"/>

                        <label> Bairro </label>
                        <input className="input-box" value={inputNeighborhood} onChange= {(e)=> alteraInputNeighborhood(e.target.value)} type="text"/>

                        <label> Forma Pagamento </label>
                        <select className="input-box" value={inputFormPayment} onChange={(e) => alteraInputFormPayment(e.target.value)}>
                            <option value="pix"> PIX </option>
                            <option value="debito"> DEBITO </option>
                            <option value="credito"> CREDITO </option>
                            <option value="dinheiro"> DINHEIRO </option>
                        </select>

                        <label> Dia do Pagamento </label>
                        <select className="input-box" value={inputDayPayment} onChange={(e) => alteraInputDayPayment(e.target.value)} >
                            <option value='5'> 5 </option>
                            <option value='10'> 10 </option>
                            <option value='15'> 15 </option>
                            <option value='20'> 20 </option>
                            <option value='25'> 25 </option>
                            <option value='30'> 30 </option>
                        </select>

                        <label> Valor do Pagamento </label>
                        <input className="input-box" value={inputValuePayment} onChange= {(e)=> alteraInputValuePayment(e.target.value)} type="number" min="0"/>
                        <div id="button">
                            <button type="submit" className="btnCadastrar"> Cadastrar </button>
                            <button type="reset" className="btnLimpar"> Limpar </button>
                            <button type="button" className="btnVoltar" onClick={()=> routerBack.push('/lobby')}> Voltar </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
