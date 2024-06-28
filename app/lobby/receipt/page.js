'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import './receipt.css'; // Importa o CSS

export default function Receipt() {
    const searchParams = useSearchParams();
    const name = searchParams.get('name');
    const address = searchParams.get('address');
    const housenumber = searchParams.get('housenumber');
    const neighborhood = searchParams.get('neighborhood');
    const phone = searchParams.get('phone');
    const telephone = searchParams.get('telephone');
    const paymentamount = searchParams.get('paymentamount');
    const dateofpayment = searchParams.get('dateofpayment') || new Date().toLocaleDateString(); // Data atual

    useEffect(()=>{
        window.print();
    }, [])

    return (
        <div id="receipt">

            <h1>Comprovante de Pagamento</h1>
            <div className="receipt-details">
                <p><strong>Nome:</strong> {name}</p>
                <p><strong>Endereço:</strong> {address}</p>
                <p><strong>Número:</strong> {housenumber}</p>
                <p><strong>Bairro:</strong> {neighborhood}</p>
                <p><strong>Telefone:</strong> {telephone}</p>
                <p><strong>Valor do Pagamento:</strong> {paymentamount}</p>
                <p><strong>Data do Pagamento:</strong> {dateofpayment}</p>
            </div>
            <div className="receipt-footer">
                <p>Obrigado por seu pagamento!</p>
            </div>
        </div>
    );
}
