'use client'
import { useRouter } from 'next/navigation'
import "../style.css";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Buttons() {
    
    const router = useRouter();

    const [clientes, setClientes] = useState([]);
    const [totalRecebimento, setTotalRecebimento] = useState(0);
    const [clientesEmAtraso, setClientesEmAtraso] = useState(0);
    const [novosClientes, setNovosClientes] = useState(0);
    const [clientesDesistentes, setClientesDesistentes] = useState(0);

    useEffect(() => {
        getClientData();
    }, []);

    async function getClientData() {
        try {
            const response = await axios.get("/api/get_client", {
                headers: {
                    'Content-type': 'application/json'
                }
            });

            const data = response.data;
            setClientes(data);

            // Calculate total receivables
            const totalRecebimento = data.reduce((total, cliente) => total + cliente.paymentamount, 0);
            setTotalRecebimento(totalRecebimento);

            // Calculate clients in arrears
            const today = new Date();
            const clientesEmAtraso = data.filter(cliente => 
                !cliente.pagamentoConfirmado && new Date(cliente.dateofpayment) < today
            ).length;
            setClientesEmAtraso(clientesEmAtraso);

            // Calculate new clients added in the last month
            const lastMonth = new Date();
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            const novosClientes = data.filter(cliente => new Date(cliente.createdAt) >= lastMonth).length;
            setNovosClientes(novosClientes);

            // Calculate clients who have quit in the last month
            const responseDeleted = await axios.get("/api/get_deleted_clients", {
                headers: {
                    'Content-type': 'application/json'
                }
            });
            const deletedData = responseDeleted.data;
            const clientesDesistentes = deletedData.filter(cliente => new Date(cliente.deletedAt) >= lastMonth).length;
            setClientesDesistentes(clientesDesistentes);

        } catch (error) {
            console.error('Error fetching client data:', error);
        }
    }

    return(
        <div className="button-container">
            <div className="button-wrapper">
                <button id="btnRegister" onClick={()=> router.push('/lobby/register')}> Cadastrar </button>
                <button id="btnLocation" onClick={()=> router.push('/lobby/payment')}> Pagamento </button>
                <button id="btnOverview" onClick={()=> router.push('/lobby/overview')}> Visão Geral </button>
                <button id="btnExit" onClick={()=> router.push('/login')}> Sair </button>
            </div>
        </div>
    );
}
