'use client'

export default function RegistrationData(){

    return(
        <div className="label-container">
            <br/>

            <label> Nome </label>
            <br/>
            <input className="inputName" type="text"/>

            <br/>
            <br/>

            <label> Endereço </label>
            <br/>
            <input className="inputAdress" type="text"/>

            <br/>
            <br/>

            <label> Número Casa</label>
            <br/>
            <input className="inputName" type="number"/>

            <br/>
            <br/>

            <label> Telefone </label>
            <br/>
            <input className="inputName" type="number"/>

            <br/>
            <br/>

            <label> Bairro </label>
            <br/>
            <input className="inputName" type="text"/>

            <br/>
            <br/>

            <label> Forma Pagamento </label>
            <br/>
            <select>
                <option value="pix"> PIX </option>
                <option value="debito"> DEBITO </option>
                <option value="credito"> CREDITO </option>
                <option value="dinheiro"> DINHEIRO </option>
            </select>

            <br/>
            <br/>

            <label> Dia do Pagamento </label>
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
            <input className="inputName" type="number"/>

            <br/>
            <br/>
        </div>
    )

}