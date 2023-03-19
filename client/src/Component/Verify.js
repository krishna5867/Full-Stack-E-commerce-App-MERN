import React from 'react';
import { useParams } from 'react-router-dom';

function Verify() {
    const params = useParams();
    const { orderId, signature } = params;

    return (
        <div>
            <h1>Order Verification Page</h1>
            <p>Order ID: {orderId}</p>
            <p>Signature ID: {signature}</p>
        </div>
    );
}

export default Verify;
