'use client'

import axios from 'axios';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import '../style.css';

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
                alert("Cadastro realizado com sucesso!");
                alteraInputName("");
                alteraInputAdress("");
                alteraInputNumberHouse("");
                alteraInputTelephone("");
                alteraInputNeighborhood("");
                alteraInputFormPayment("pix");
                alteraInputDayPayment("5");
                alteraInputValuePayment("");
            } else {
                alert("Ocorreu um erro ao cadastrar. Por favor, tente novamente.");
            }
        })
        .catch(error => {
            console.error('Erro ao enviar formulário:', error);
            alert("Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.");
        });
    }
    
    return (
        <div id="registration-container"> {/* Adicione este ID para escopar o CSS */}
            <div id="container">
                <div id="form-container">
                    <h1 id="title">Cadastro de Clientes</h1>
                    <form id="form" onSubmit={(e)=> sendFormulary(e)}>
                        <label> Nome </label>
                        <input className="input-box" onChange={ (e)=> alteraInputName(e.target.value)} type="text"/>

                        <label> Endereço </label>
                        <input className="input-box" onChange= {(e)=> alteraInputAdress(e.target.value)} type="text"/>

                        <label> Número Casa</label>
                        <input className="input-box" onChange= {(e)=> alteraInputNumberHouse(e.target.value)} type="number"/>

                        <label> Telefone </label>
                        <input className="input-box" onChange= {(e)=> alteraInputTelephone(e.target.value)} type="number"/>

                        <label> Bairro </label>
                        <input className="input-box" onChange= {(e)=> alteraInputNeighborhood(e.target.value)} type="text"/>

                        <label> Forma Pagamento </label>
                        <select className="input-box" onChange={(e) => alteraInputFormPayment(e.target.value)}>
                            <option value="pix"> PIX </option>
                            <option value="debito"> DEBITO </option>
                            <option value="credito"> CREDITO </option>
                            <option value="dinheiro"> DINHEIRO </option>
                        </select>

                        <label> Dia do Pagamento </label>
                        <select className="input-box" onChange={(e) => alteraInputDayPayment(e.target.value)} >
                            <option value='5'> 5 </option>
                            <option value='10'> 10 </option>
                            <option value='15'> 15 </option>
                            <option value='20'> 20 </option>
                            <option value='25'> 25 </option>
                            <option value='30'> 30 </option>
                        </select>

                        <label> Valor do Pagamento </label>
                        <input className="input-box" onChange= {(e)=> alteraInputValuePayment(e.target.value)} type="number"/>
                        <div id="button">
                            <button type="submit"> Cadastrar </button>
                            <button type="reset"> Limpar </button>
                            <button type="button" onClick={()=> routerBack.push('/lobby')}> Voltar </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
