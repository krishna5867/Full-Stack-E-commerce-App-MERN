import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from '../Redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import { Row, Input, Container } from 'reactstrap';
import Footer from '../Component/Footer';
import Image from '../Images/image1.png'
import Category1 from '../Images/category-1.jpg'
import Category2 from '../Images/category-2.jpg'
import Category3 from '../Images/category-3.jpg'
import Exclusive from '../Images/exclusive.png'
import logo1 from '../Images/logo-godrej.png'
import logo2 from '../Images/logo-oppo.png'
import logo3 from '../Images/logo-coca-cola.png'
import logo4 from '../Images/logo-paypal.png'
import logo5 from '../Images/logo-philips.png'


const Product = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState("");
    const [search, setSearch] = useState("");
    const [checked, setChecked] = useState([]);
    const [selectedOption, setSelectedOption] = useState([]);

    const fetchProducts = async () => {
        const res = await axios.get('/getProducts');
        if (res.status === 200) {
            setProducts(res.data.product);
        }
    }

    const handleSearch = async (e) => {
        setSearch(e.target.value);
        const res = await axios.get(`/search?search=${search}`);
        if (res.status === 200) {
            setProducts(res.data.product)
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

    const handleChecked = (e) => {
        const isChecked = e.target.checked;
        const value = e.target.value;
        if (isChecked) {
            // setChecked(value)
            setChecked([...checked, value])
        } else {
            setChecked(checked.filter((item) => item !== value))
        }
    }

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    }

    const handleFilter = async () => {
        // const res = await axios.get(`/filterProduct`);
        // if(res.status === 200){
        //     console.log(res.data);
        // }
    }


    useEffect(() => {
        if (!search) fetchProducts();
    }, [search])

    return (
        <>
            <Input type="text" className=' mt-4 w-50 mt-1 mx-auto' placeholder='Search' value={search} onChange={handleSearch} style={{ height: '40px' }} />
            {/* <Row className='p-2'> */}
            {/* Filter */}
            {/* <div className='col-md-3'>
                    <Row>
                        <h3 className='d-flex justify-content-left'>Categories</h3>
                        <div className="col-6 col-md-12 mt-4">
                            <div className='text-center'>
                                <div className='d-flex'>
                                    <div className='mt-2 mx-4'><input type="checkbox" value="Men" onChange={handleChecked} style={{ width: '20px', height: '20px' }} /></div>
                                    <div><h4>Mens</h4></div>
                                </div>
                                <div className='d-flex'>
                                    <div className='mt-2 mx-4'><input type="checkbox" value="Child" onChange={handleChecked} style={{ width: '20px', height: '20px' }} /></div>
                                    <div><h4>Child</h4></div>
                                </div>
                                <div className='d-flex'>
                                    <div className='mt-2 mx-4'><input type="checkbox" value="Women" onChange={handleChecked} style={{ width: '20px', height: '20px' }} /></div>
                                    <div><h4>Women</h4></div>
                                </div>
                            </div>
                        </div>
                        <div className=" mt-4 col-6 col-md-12"> */}
            {/* <h2>Range</h2> */}
            {/* <div>
                                <div className='d-flex'>
                                    <div className='mt-2 mx-4'><input type="radio" name="option" value="option1" checked={selectedOption === "option1"} onChange={handleOptionChange} style={{ width: '20px', height: '20px' }} /></div>
                                    <div><h4>$0-20</h4></div>
                                </div>
                                <div className='d-flex'>
                                    <div className='mt-2 mx-4'><input type="radio" name="option" value="option2" checked={selectedOption === "option2"} onChange={handleOptionChange} style={{ width: '20px', height: '20px' }} /></div>
                                    <div><h4>$21-30</h4></div>
                                </div>
                                <div className='d-flex'>
                                    <div className='mt-2 mx-4'><input type="radio" name="option" value="option3" checked={selectedOption === "option3"} onChange={handleOptionChange} style={{ width: '20px', height: '20px' }} /></div>
                                    <div><h4>$31-40</h4></div>
                                </div>
                                <div className='border d-flex mt-4 '>
                                    <select className='w-50'> 
                                        <option value="NEW">Select</option>
                                        <option value="NEW">New</option>
                                        <option value="NEW">New</option>
                                        <option value="NEW">New</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button className='w-50 mt-4 mb-2 btn btn-primary btn-lg  text-light' onClick={handleFilter}>Apply Filter</button>
                    </Row>
                </div> */}
            {/* Products  */}
            <Row className='mt-4'>
                <div className='col-md-4 px-6 col-12 d-flex justify-content-center align-items-center'>
                    {/* <div className='text-start md:px-4'>
                        <h2 className='md:px-2'>Give Your Workout a New Style !</h2>
                        <button className=" mt-3 mx-2 btn btn-warning rounded-4xl text-dark">Explore More</button>
                    </div> */}
                    <div className='text-start px-5'>
                        <h2 className='px-2'>Give Your Workout a New Style!</h2>
                        <button className="mt-3 mx-2 btn btn-warning rounded-4xl text-dark">Explore More</button>
                    </div>

                </div>
                <div className='col-md-8 col-12'>
                    <img src={Image} alt="" className='w-75' />
                </div>
                {/* Category Products */}
                <Row className='mt-5 lh-lg'>
                    <div className='col-md-4 col-6'><img src={Category1} alt="" className='mt-3 w-75 rounded' /></div>
                    <div className='col-md-4 col-6'><img src={Category2} alt="" className='mt-3 w-75 rounded' /></div>
                    <div className='col-md-4 col-6'><img src={Category3} alt="" className='mt-3 w-75 rounded' /></div>
                </Row>
                <div className='mt-5 d-flex justify-content-between px-5'>
                    <div className='md-px-3'><h2>All Products</h2></div>
                    <div className='md-px-5'>
                        <select name="" id="">
                            <option value="New">Filter Products</option>
                            <option value="New">Lower to higher </option>
                            <option value="New">Higher to lower</option>
                            <option value="New">Popular</option>
                            <option value="New">Demanding</option>
                            <option value="New">New</option>
                        </select>
                    </div>
                </div>
                <div className='d-flex justify-content-center flex-wrap'>
                    {products && products.map((product) =>
                        <>
                            <ToastContainer autoClose={2000} />
                            <div className='d-flex m-3'>
                                <div className="" key={product._id}>
                                    <Link to={`/product/${product._id}`} className='text-decoration-none text-white'>
                                        <img src={product.image?.url} className="card-img-top w-full" alt="..." style={{ height: '18rem' }} />
                                    </Link>
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name.toUpperCase()}</h5>
                                        <p className="card-text">{product.description}</p>
                                        <p className="card-text"><h3>${product.price}</h3></p>
                                        <button className='btn btn-primary' onClick={() => handleAddToCart(product)}><b>Add To Cart</b></button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

            </Row>
            {/* Exclusive Products */}
            <Row className='mt-5'>
                <div className='col-md-6 col-12 d-flex justify-content-start align-items-center px-5'>
                    <div className='text-start px-5'>
                        <p className='text-gray md:fs-4 fs-5'>Exclusively Available on RedStore</p>
                        <h1 className='text-bolder'>Smart Band 4</h1>
                        <p>The Mi Smart Band 4 features a 39.9% larger (than Mi Band 3) AMOLED color fuli-touch display with adjustable brightness, so everything is clear as can be.</p>
                        <button className="btn btn-warning rounded-4xl text-dark mt-2">Buy Now</button>
                    </div>
                </div>
                <div className='col-md-6 col-12'>
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
    );
}

export default Product;
