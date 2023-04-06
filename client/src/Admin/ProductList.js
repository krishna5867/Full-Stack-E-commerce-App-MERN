import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from '../Redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import { Row } from 'reactstrap';
import Footer from '../Component/Footer';
import Image from '../Images/image1.png'
import Category1 from '../Images/category-1.jpg'
import Category2 from '../Images/category-2.jpg'
import Category3 from '../Images/category-3.jpg'
// import Category4 from '../Images/gallery-3.jpg'
import Exclusive from '../Images/exclusive.png'
import logo1 from '../Images/logo-godrej.png'
import logo2 from '../Images/logo-oppo.png'
import logo3 from '../Images/logo-coca-cola.png'
import logo4 from '../Images/logo-paypal.png'
import logo5 from '../Images/logo-philips.png'
import Spinner from '../Component/Loading';


const Product = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState('');
    const [loading, setLoading] = useState(true)

    const fetchProducts = async () => {
        const res = await axios.get('/getProducts');
        if (res.status === 200) {
            setProducts(res.data.product);
            setLoading(false)
        }
    }

    const handleAddToCart = (product) => {
        toast.success("Added Successfully")
        dispatch(addToCart({
            name: product.name,
            price: product.price,
            image: product.image?.url
        }));
    };

    useEffect(() => {
        setLoading(true)
        fetchProducts();
    }, [])

    return (
        <>
            {loading ? <Spinner  /> : (
                <>
                    <Row className='mt-4'>
                        <div className='row'>
                            <div className='col-md-4 px-6 col-12 d-flex flex-row justify-content-center align-items-center'>
                                <div className='text-md-start px-5'>
                                    <h2 className='px-md-5'>Give Your Workout a New Style!</h2>
                                    <button className="ms-md-5 mt-3 btn btn-warning rounded-4xl">
                                        <Link to={"/products"} className='text-decoration-none text-black fs-5'>Explore More</Link>
                                    </button>
                                </div>
                            </div>
                            <div className='col-md-8 col-12 order-md-last order-first'>
                                <img src={Image} alt="" className='w-75' />
                            </div>
                        </div>

                        {/* Category Products */}
                        <Row className='d-flex mt-5 lh-lg'>
                            <Link to="/category/Mens" className='col-md-4 col-6 mb-3 mb-md-0'>
                                <div><img src={Category1} alt="" className='card-img-top mt-3 w-75 rounded' /></div>
                            </Link>
                            <Link to="/category/Child" className='col-md-4 col-6 mb-3 mb-md-0'>
                                <div><img src={Category2} alt="" className='card-img-top mt-3 w-75 rounded' /></div>
                            </Link>
                            <Link to="/category/Women" className='col-md-4 col-6'>
                                <div><img src={Category3} alt="" className='card-img-top mt-3 w-75 rounded' /></div>
                            </Link>
                            {/* <Link to="/category/Fashion" className='col-md-4 col-6'>
                                <div className='d-md-none sm-block'><img src={Category4} alt="" className='card-img-top mt-3 rounded p-3' /></div>
                            </Link> */}
                        </Row>

                        <h2 className='mt-5 text-center'><b>Featured Products</b></h2>
                        {/* All Products */}
                        <div className='mt-2 d-flex justify-content-center flex-wrap '>
                            {products && products.map((product) =>
                                <>
                                    <ToastContainer autoClose={2000} />
                                    <div className='d-flex'>
                                        <div className="shadow-lg m-4 mb-5 bg-white rounded card-img-top" key={product._id}>
                                            <Link to={`/product/${product._id}`} className='text-decoration-none text-white'>
                                                <img src={product.image?.url} className="w-full" alt="..." style={{ height: '18rem', width: '15rem' }} />
                                            </Link>
                                            <div className="card-body">
                                                <h5 className="card-title">{product.name.toUpperCase()}</h5>
                                                <p className="card-text">{product.description}</p>
                                                <p className="card-text"><h3>${product.price}</h3></p>
                                                <button className='btn btn-primary mb-3' onClick={() => handleAddToCart(product)}><b>Add To Cart</b></button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                    </Row>
                    {/* Exclusive Products */}
                    <Row className='mt-5 shadow-lg bg-white rounded px-md-5 mx-5'>
                        <div className='col-md-6 col-12 d-flex justify-content-start align-items-center px-5'>
                            <div className='text-start px-md-5'>
                                <p className='fs-4 pt-4'>Exclusively Available on RedStore</p>
                                <h1>Smart Band 4</h1>
                                <p>The Mi Smart Band 4 features a 39.9% larger (than Mi Band 3) AMOLED color fuli-touch display with adjustable brightness, so everything is clear as can be.</p>
                                {/* <button className="btn btn-warning rounded-4xl text-dark mt-2 fs-5">Buy Now</button> */}
                            </div>
                        </div>
                        <div className='col-md-6 col-12 mt-md-2 mt-mb-0 mt-5 mb-4'>
                            <img src={Exclusive} alt="" className='w-75' />
                        </div>
                    </Row>
                    <Row className='mt-5'>
                        <div>
                            <img src={logo1} alt="" />
                            <img src={logo2} alt="" />
                            <img src={logo3} alt="" />
                            <img src={logo4} alt="" />
                            <img src={logo5} alt="" />
                        </div>
                    </Row>
                    <Footer />
                </>
            )}

        </>
    );
}

export default Product;
