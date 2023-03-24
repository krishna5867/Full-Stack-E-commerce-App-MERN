import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container } from 'reactstrap';
import Spinner from '../Component/Loading';


const OrderDetails = () => {
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState([]);
    const { id } = useParams();

    const fetchOrder = async () => {
        const res = await axios.get(`/getOneOrder/${id}`);
        console.log(res.data);
        if (res.status === 200) {
            setOrder(res.data.order)
            setLoading(false)

        }
    }
    useEffect(() => {
        setLoading(true)
        fetchOrder()
    }, [id])

    return (
        <>
            {
                loading ? (<Spinner />) : (<>
                    <Container>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Buyer Name</th>
                                    <th scope="col">Buyer Email</th>
                                    {/* <th scope="col">Total Amount</th> */}
                                    {/* <th scope="col">Shipping Charge</th> */}
                                    <th scope="col">Shipping Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={order._id}>
                                    {/* <td>{order._id}</td> */}
                                    <p>{order?.user?._id}</p>
                                    <td><p>{order?.user?.name}</p></td>
                                    <td>{order?.user?.email}</td>
                                    {/* <td className='fs-4'>${order?.total}</td> */}
                                    {/* <td className='fs-4'>${order.shippingcharge}</td> */}
                                    <td>
                                        <p>{order?.shippingAddress?.address}</p>
                                        <p>{order?.shippingAddress?.city}, {order?.shippingAddress?.state} - {order?.shippingAddress?.postalCode}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {/* <h3>Order Items:</h3> */}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Photo</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order?.orderItems?.map((item) => (
                                    <tr key={item._id}>
                                        <td><img src={item?.image} alt={item?.name} className="rounded" style={{ width: '10rem' }} /></td>
                                        <td className='fs-4'>{item?.name}</td>
                                        <td className='fs-4'>({item?.quantity})</td>
                                        <td className='fs-4'>${item?.price}</td>

                                    </tr>
                                ))}
                            </tbody>

                            <tbody>
                                    <td colspan="2"></td>
                                    <td className='fs-4'>Shipping Charge</td>
                                    <td className='fs-3'>${order.shippingcharge}</td>
                            </tbody>
                            <tbody>
                                <td colspan="2"></td>
                                <td className='fs-4'>Sub Total</td>
                                <td className='fs-2'>${order?.total}</td>
                            </tbody>
                            <tbody>
                                <td colspan="2"></td>
                                <td className='fs-4'>Total</td>
                                <td className='fs-1'>$ {order?.total + 50}</td>
                            </tbody>
                        </table>
                    </Container>
                </>)}


        </>



    )
}

export default OrderDetails


