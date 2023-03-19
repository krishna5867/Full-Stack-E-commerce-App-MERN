import React from 'react';
import { useParams } from 'react-router-dom';

function Verify() {
    const params = useParams();
    const { orderId, signature } = params;
    console.log(orderId);

    return (
        <div>
            <h3 className='mb-5'>Order Verification Page</h3>
            <h5>Order ID: {orderId}</h5>
            <h5>Signature ID: {signature}</h5>
        </div>
    );
}

export default Verify;
