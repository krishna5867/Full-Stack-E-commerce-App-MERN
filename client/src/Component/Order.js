import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
// http://localhost:3000/order/order_LTgUK0KZ81F3U5/pay_LTgUaeIU0fmg6Y/46f211ca7ca15b9a2a010c169a640d270200ed540d05497f8d78b471607a8b76
function Order() {
    const { orderId, paymentId } = useParams();
    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: '80vh'}}>
            <Card className='p-5 shadow-lg p-3 mb-5 bg-white rounded'>
                <CardBody>
                    <div className="d-flex justify-content-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="11" fill="green" />
                            <path d="M17.707,7.293c0.391,0.391,0.391,1.023,0,1.414l-8,8c-0.391,0.391-1.023,0.391-1.414,0l-4-4c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0L9,14.586l7.293-7.293C16.684,6.902,17.316,6.902,17.707,7.293z" fill="#FFFFFF" />
                        </svg>

                    </div>
                    <CardTitle><h2 className='mb-3 mt-3'>Payment Successful</h2></CardTitle>
                    <CardText>
                        <span className='fs-5'>Order ID: {orderId}</span>
                        <br />
                        <span className='fs-5'>Payment ID: {paymentId} </span>
                    </CardText>
                    <button className=' mt-3 btn btn-warning text-black btn-lg' href="/">Continue Shopping</button>
                </CardBody>
            </Card>
        </div>
    );
};



export default Order;
