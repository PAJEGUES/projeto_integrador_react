import "../style.css"; 

export default function Buttons(){
    return(
        <div>
            <button className="btnPagamentos"> Pagamentos </button>
            <button className="btnCadastro"> Cadastro </button>
            <button className="btnLocalizacao"> Localização </button>
            <button className="btnVisaoGeral"> Visão Geral </button>
            <button className="btnSair"> Sair </button>
        </div>
    )
}