import React from 'react';
import { Card, CardBody, Row, Container } from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity, removeAllItems } from "../Redux/cartSlice";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart.items);
    const amount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalQuantity = cartItems.reduce((total, item) => { return total + item.quantity; }, 0);

    const handleRemoveItem = (productId) => {
        dispatch(removeFromCart(productId));
    }

    const handleIncreaseQuantity = (productId) => {
        dispatch(increaseQuantity(productId));
    };

    const handleDecreaseQuantity = (productId) => {
        dispatch(decreaseQuantity(productId));

    };
    const handleRemoveAllItems = (items) => {
        dispatch(removeAllItems(items))
    }

    const handleOpenRazorpay = (data) => {
        const options = {
            key: 'rzp_test_hBcE1HSEv7PAgW',
            amount: Number(data.amount),
            currency: data.currency,
            order_id: data.id,
            name: 'T-Shirt Store',
            description: 'Premium T-shirt store, Dhanbad Jharkhand',
            image: "https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg",
            handler: function (response) {
                axios.post('/verify', {
                    response: response,
                    orderId: response.razorpay_order_id,
                    paymentId: response.razorpay_payment_id,
                    signature: response.razorpay_signature,
                })
                    .then((res) => {
                        // console.log(res, '46');
                        const orderId = res.data.razorpay_order_id;
                        const PaymentId = res.data.razorpay_payment_id;
                        const signature = res.data.razorpay_signature;
                        // console.log(orderId, "48");
                        navigate(`/order/${orderId}/${PaymentId}/${signature}`);
                        handleRemoveAllItems();
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            },
            prefill: {
                name: "Krishna Kumar",
                email: "krishnakmr@968.com",
                contact: "+917677263045",
            },
            notes: {
                address: "Dhanbad Jharkhand",
            },
            theme: {
                color: "#61dafb",
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }


    const handleCheckout = (amount) => {
        const _data = { amount: amount }
        placeOrder()
        // let token = localStorage.getItem("token");
        axios.post('/order', _data, {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // }
        })
            .then(res => {
                handleOpenRazorpay(res.data.data)

            })
            .catch(err => {
                console.log(err, 91)
            })
    }


    const placeOrder = async () => {
        try {
            const itemPrices = cartItems.map(item => item.price * item.quantity);
            const itemPrice = itemPrices.reduce((acc, cur) => acc + cur, 0);
            const orderItems = cartItems.map(item => ({
                name: item.name,
                quantity: item.quantity,
                image: item.image,
                price: item.price,
                product: item._id
            }));
            let token = localStorage.getItem("token");
            const res = await axios.post("/placeOrder", {
                orderItems: orderItems,
                shippingAddress: {
                    address: "jharia",
                    city: "Dhanbad",
                    postalCode: 121312,
                    district: "Dhanbad",
                    state: "Jharkhand",
                    country: "India"
                },
                shippingcharge: 50,
                total: itemPrice,
                grandtotal: itemPrice + 50,
                isDelivered: false
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (res.data.status === 200) {
                console.log(res.data, '122');
            }
        } catch (error) {
            console.log(error.message);
        }
    }






    return (
        <>
            <Row>
                <Container className='col-md-8'>
                    {
                        cartItems && cartItems.length > 0 ? (
                            <Card className='m-3'>
                                <CardBody className='d-flex justify-content-around'>
                                    <div><b>IMAGE</b></div>
                                    <div><b>PRODUCT</b></div>
                                    <div><b>PRICE</b></div>
                                    <div><b>Quantity</b></div>
                                    <div><b>REMOVE</b></div>
                                </CardBody>
                            </Card>
                        ) :
                            ""
                    }
                    {
                        cartItems && cartItems.length === 0 ? (
                            <Card className='w-50 mx-auto mt-5 border border-2 border-warning'>
                                <CardBody>
                                    <h3>No items in your cart !</h3>
                                    <button className='btn btn-dark mt-3'> <Link to='/' className='text-decoration-none text-light'>Back Home</Link> </button>
                                </CardBody>
                            </Card>

                        ) : (
                            cartItems.map((product) => (
                                <Card key={product.id} className='m-3'>
                                    <CardBody className="d-flex justify-content-around">
                                        <img src={product.image} alt="cartImg" className='rounded' style={{ width: '4rem' }} />
                                        <div >
                                            <h5 className=' mx-3 mt-4'>{product.name}</h5>
                                        </div>
                                        <h5 className=' mx-3 mt-4' >${product.price}</h5>
                                        <h5 className=' mx-3 mt-4' >({product.quantity})</h5>
                                        <div className=' mx-3 mt-3'>
                                            <button className='btn btn-success mx-2' onClick={() => handleDecreaseQuantity(product.id)}>-</button>
                                            <button className='btn btn-primary' onClick={() => handleIncreaseQuantity(product.id)}>+</button>
                                            <button className="btn text-danger rounded-circle btn-lg" onClick={() => handleRemoveItem(product.id)}><i className="fas fa-trash fs-2"></i></button>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))
                        )
                    }
                </Container>
                {
                    cartItems && cartItems.length > 0 ? (
                        <Container className='col-md-4 mt-3'>
                            <Card>
                                <CardBody>
                                    <h3 className='mb-4'>CART SUMMARY</h3>
                                    <div className='d-flex flex-row justify-content-around'>
                                        <div><h5 className='mt-4 mb-2'>Number Of Items :</h5></div>
                                        <div><h5 className='mt-4 mb-2'>{cartItems.length}</h5></div>
                                    </div>
                                    <div className='d-flex flex-row justify-content-around'>
                                        <div><h5 className='mt-4 mb-2'>Total Quantity :</h5></div>
                                        <div><h5 className='mt-4 mb-2'>{totalQuantity}</h5></div>
                                    </div>
                                    <div className='d-flex justify-content-around mb-3'>
                                        <div><h5 className='mt-4 mb-2'>Total Amount :</h5></div>
                                        <div><h5 className='mt-4 mb-2'><h2>${amount}</h2> </h5></div>
                                    </div>
                                    <button className='btn btn-warning' onClick={() => handleCheckout(amount)}><h5>Checkout</h5></button>
                                </CardBody>
                            </Card>
                        </Container>
                    )
                        :
                        ""
                }
            </Row>
        </>
    );
}

export default Cart;
