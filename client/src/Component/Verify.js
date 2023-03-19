import React from 'react';
import { useParams } from 'react-router-dom';

function Verify() {
    const params = useParams();
    const { orderId, signature } = params;

    return (
        <div>
            <h1 className='mb-5'>Order Verification Page</h1>
            <h5>Order ID: {orderId}</h5>
            <h5>Signature ID: {signature}</h5>
        </div>
    );
}

export default Verify;
