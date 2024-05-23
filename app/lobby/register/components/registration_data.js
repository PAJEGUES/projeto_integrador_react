'use client'

import axios from 'axios';
import { useEffect, useState } from "react";

export default function RegistrationData(){

    const [inputName, alteraInputName] = useState("");
    const [inputAddress, alteraInputAdress] = useState("");
    const [inputNumberHouse, alteraInputNumberHouse] = useState("");
    const [inputTelephone, alteraInputTelephone] = useState("");
    const [inputNeighborhood, alteraInputNeighborhood] = useState("");
    const [inputFormPayment, alteraInputFormPayment] = useState("");
    const [inputDayPayment, alteraInputDayPayment] = useState("");
    const [inputValuePayment, alteraInputValuePayment] = useState("");

    function sendFormulary(e) {
        e.preventDefault();
    
        const formData = {
            name: inputName,
            address: inputAddress,
            numberHouse: inputNumberHouse,
            telephone: inputTelephone,
            neighborhood: inputNeighborhood,
            formPayment: inputFormPayment,
            dayPayment: inputDayPayment,
            valuePayment: inputValuePayment
        };
    
        axios.post('/api/post_client', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.status === 200) {
                alert("Cadastro realizado com sucesso!");
                setInputName("");
                setInputAddress("");
                setInputNumberHouse("");
                setInputTelephone("");
                setInputNeighborhood("");
                setInputFormPayment("");
                setInputDayPayment("");
                setInputValuePayment("");
            } else {
                alert("Ocorreu um erro ao cadastrar. Por favor, tente novamente.");
            }
        })
        .catch(error => {
            console.error('Erro ao enviar formulário:', error);
            alert("Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.");
        });
    }
    
    return(
        <div className="label-container">
            <form onSubmit={(e)=> sendFormulary(e)}>
                <br/>
                <label> Nome </label>
                <br/>
                <input onChange={ (e)=> alteraInputName(e.target.value)} className="inputName" type="text"/>

                <br/>
                <br/>

                <label> Endereço </label>
                <br/>
                <input onChange= {(e)=> alteraInputAdress(e.target.value)} className="inputAdress" type="text"/>

                <br/>
                <br/>

                <label> Número Casa</label>
                <br/>
                <input onChange= {(e)=> alteraInputNumberHouse(e.target.value)} className="inputNumberHouse" type="number"/>

                <br/>
                <br/>

                <label> Telefone </label>
                <br/>
                <input onChange= {(e)=> alteraInputTelephone(e.target.value)} className="inputTelephone" type="number"/>

                <br/>
                <br/>

                <label> Bairro </label>
                <br/>
                <input onChange= {(e)=> alteraInputNeighborhood(e.target.value)} className="inputNeighborhood" type="text"/>

                <br/>
                <br/>

                <label> Forma Pagamento </label>
                <br/>
                <select onChange={(e) => alteraInputFormPayment(e.target.value)}>
                    <option value="pix"> PIX </option>
                    <option value="debito"> DEBITO </option>
                    <option value="credito"> CREDITO </option>
                    <option value="dinheiro"> DINHEIRO </option>
                </select>

                <br/>
                <br/>

                <label onChange={(e)=> alteraInputDayPayment(e.target.value)}> Dia do Pagamento </label>
                <br/>
                <select>
                    <option value="5"> 5 </option>
                    <option value="10"> 10 </option>
                    <option value="15"> 15 </option>
                    <option value="20"> 20 </option>
                    <option value="25"> 25 </option>
                    <option value="30"> 30 </option>
                </select>

                <br/>
                <br/>

                <label> Valor do Pagamento </label>
                <br/>
                <input onChange= {(e)=> alteraInputValuePayment(e.target.value)} className="valuePayment" type="number"/>
                
                <br/>
                <br/>

                <button style={{height: 30, position: "fixed", bottom: 65, left: 0}} type="submit"> Cadastrar </button>
                <br/>
                <br/>

                <button style={{height: 30, position: "fixed", bottom: 32, left: 0}} type="reset"> Limpar </button>
                
            </form>
        </div>
    )

}