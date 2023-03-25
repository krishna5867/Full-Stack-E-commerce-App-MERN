import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Container, Card, Button } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';

const MyOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    // const id = '6401f89f8e0c0e567864c6df';
    console.log(order);
    const fetchOrder = async () => {
        const res = await axios.get(`/myOrder/${id}`);
        console.log(res.data);
        if (res.status === 200) {
            setOrder(res.data.order)
        }
    }
    useEffect(() => {
        fetchOrder()
    }, [])

    return (
        <>
            <Row className='p-4'>
                <Container fluid className='col-lg-3 mb-5'>
                    <Container className='mt-4 mb-5'>
                    </Container>
                    <Button className='w-100 mt-5 bg-'><h3><Link to={`/profile/${id}`} className='text-decoration-none text-white'>Profile</Link></h3></Button>
                    <Button className='w-100 mt-3'><h3><Link to={`/myOrder/${id}`} className='text-decoration-none text-white'>Order</Link></h3></Button>
                </Container>
                <Container className='col-lg-9' style={{ height: '88vh' }}>
                    <h1>Orders</h1>
                    <Container className='mt-3'>
                        <Card style={{ height: '32rem' }}>
                            <div className='mt-2' style={{ height: '300px' }}>

                                {/* Content */}
                                {order && order[0] ? (
                                    <>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Id</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Shipping Address</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr key={order[0]._id}>
                                                    <td>{order[0]._id}</td>
                                                    <td>{order[0].total}</td>
                                                    <td>{order[0].orderItems.reduce((acc, item) => acc + item.quantity, 0)}</td>
                                                    <td>
                                                        <p>{order[0].shippingAddress.address}</p>
                                                        <p>{order[0].shippingAddress.city}, {order[0].shippingAddress.state} - {order[0].shippingAddress.postalCode}</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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
                                                {order[0].orderItems.map((item) => (
                                                    <tr key={item._id}>
                                                        <td><img src={item.image} alt={item.name} className="rounded" style={{ width: '10rem' }} /></td>
                                                        <td className='fs-4'>{item.name}</td>
                                                        <td className='fs-4'>({item.quantity})</td>
                                                        <td className='fs-4'>${item.price}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colSpan="2"></td>
                                                    <td className='fs-4'>Shipping Charge</td>
                                                    <td className='fs-3'>${order[0].shippingcharge}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="2"></td>
                                                    <td className='fs-4'>Sub Total</td>
                                                    <td className='fs-2'>${order[0].total}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="2"></td>
                                                    <td className='fs-4'>Total</td>
                                                    <td className='fs-1'>$ {order[0].total + 50}</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </>
                                ) : (
                                    <div className='fs-2 mt-5'>
                                        You Haven't Placed Any Order or Order Not Found !
                                    </div>
                                )}

                            </div>
                        </Card>
                    </Container>
                </Container>
            </Row>
        </>
    )
}

export default MyOrder;





