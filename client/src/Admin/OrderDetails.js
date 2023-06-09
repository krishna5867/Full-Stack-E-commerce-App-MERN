import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container } from 'reactstrap';
import Spinner from '../Component/Loading';
import {LoginContext} from '../Context/authContext'


const OrderDetails = () => {
    const {logindata, setLoginData} = useContext(LoginContext);
    // console.log(logindata);
    const [loading, setLoading] = useState(false)
    const [order, setOrder] = useState([]);
    // console.log(order);
    const { id } = useParams();
    // eslint-disable-next-line
    const [orderStatus, setOrderStatus] = useState(["Not Process", "Processing", "Shipped", "Delivered", "Cancel"]);
    const [changeOrderStatus, setChangeOrderStatus] = useState(null);


    const fetchOrder = async () => {
        try{
        let token = localStorage.getItem("token");
        const response = await axios.get(`/getOneOrder/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        // console.log(response.data);
        if (response.data.status === 200) {
            setOrder(response.data.order);
            setLoading(false)
        } else {
            setOrder(response.data.order);
            setLoading(false)

        }
    } catch (error) {
        console.log(error);
        setOrder([]);
    }
}

const handleChangeStatus = async (orderId, val) => {
    try {
        let token = localStorage.getItem("token");
        
        const res = await axios.put(`/admin/updateorder/${orderId}`, { orderStatus: val },{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        // console.log(res.data);
        if (res.data.status === 200) {
            setChangeOrderStatus(res.data.orderStatus);
            fetchOrder();
        }
    } catch (error) {
        console.log(error);
    }
}

// const user = JSON.parse(localStorage.getItem('user'));
const isAdmin = logindata.validUser && logindata.validUser.role === 'admin';

useEffect(() => {
    setLoading(true)
    fetchOrder()
}, [id, orderStatus])

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
                                <th scope="col">Shipping Address</th>
                                {isAdmin && <th scope="col">Status</th>}
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={logindata._id}>
                                <p>{logindata.validUser?._id}</p>
                                <td><p>{logindata.validUser?.name}</p></td>
                                <td>{logindata.validUser?.email}</td>
                                <td>
                                    <p>{order?.shippingAddress?.address}</p>
                                    <p>{order?.shippingAddress?.city}, {order?.shippingAddress?.state} - {order?.shippingAddress?.postalCode}</p>
                                </td>
                                <td>
                                    {isAdmin && (
                                        <td>
                                            <select className="form-select"
                                                value={changeOrderStatus}
                                                onChange={(e) => handleChangeStatus(order?._id, e.target.value)}
                                                defaultValue={order?.orderStatus}>
                                                {orderStatus.map((val, index) =>
                                                    <>
                                                        <option key={index} value={val}>
                                                            {val}
                                                        </option>
                                                    </>
                                                )}
                                            </select>
                                        </td>
                                    )}

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
                            <td className='fs-1'>$ {order?.total}</td>
                        </tbody>
                    </table>
                </Container>
            </>)}


    </>



)
}

export default OrderDetails


