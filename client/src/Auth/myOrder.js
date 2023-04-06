import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Container, Card, Button } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment'

const MyOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    // console.log(order);
    const fetchOrder = async () => {
        const res = await axios.get(`/myOrder/${id}`);
        // console.log(res.data);
        if (res.status === 200) {
            setOrder(res.data.order)
        }
    }
    useEffect(() => {
        fetchOrder()
    },[order])

    return (
        <>
            <Row className='p-4'>
                <Container fluid className='col-lg-3 mb-5'>
                    <Container className='mt-4 mb-5'>
                    </Container>
                    <Button className='w-100 mt-5 bg-'><h3><Link to={`/profile/${id}`} className='text-decoration-none text-white'>Profile</Link></h3></Button>
                    <Button className='w-100 mt-3'><h3><Link to={`/myorder/${id}`} className='text-decoration-none text-white'>Order</Link></h3></Button>
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
                                                    <th scope="col">Sno</th>
                                                    <th scope="col">Id</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order && order.length > 0 &&
                                                    order.map((orderItem ,index) => (
                                                        <tr key={orderItem._id}>
                                                            <td>{index + 1}</td>
                                                            <td><Link to={`/orderdetails/${orderItem._id}`} className="text-decoration-none">{orderItem._id}</Link></td>
                                                            <td>({orderItem.orderItems.reduce((acc, item) => acc + item.quantity, 0)})</td>
                                                            <td>{orderItem.total}</td>
                                                            <td>{moment(orderItem.createdAt).format("DD-MM-YYYY")}</td>
                                                            <td>{orderItem.orderStatus}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>

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





