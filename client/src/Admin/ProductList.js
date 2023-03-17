import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from '../Redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import { Row, Input } from 'reactstrap';
import Footer from '../Component/Footer';

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
            <Row className='p-2'>
                {/* Filter */}
                <div className='col-md-2'>
                    <Row>
                        <h2>Categories</h2>
                        <div className="col-6 col-md-12 mt-4">
                            <div style={{ width: '40px' }}>
                                <div className='d-flex'>
                                    <div className='mt-2 mx-4'><input type="checkbox" value="Men" onChange={handleChecked} style={{ width: '20px', height: '20px' }} /></div>
                                    <div><h4>Mens</h4></div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className='mt-2 mx-4'><input type="checkbox" value="Child" onChange={handleChecked} style={{ width: '20px', height: '20px' }} /></div>
                                    <div><h4>Child</h4></div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className='mt-2 mx-4'><input type="checkbox" value="Women" onChange={handleChecked} style={{ width: '20px', height: '20px' }} /></div>
                                    <div><h4>Women</h4></div>
                                </div>
                            </div>
                        </div>
                        <div className=" mt-4 col-6 col-md-12">
                            {/* <h2>Range</h2> */}
                            <div>
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
                            </div>
                        </div>
                        <button className='mt-4 mb-2 btn btn-primary text-light btn-lg' onClick={handleFilter}>Apply Filter</button>
                    </Row>
                </div>
                {/* Products  */}
                <div className='d-flex flex-wrap justify-content-center col-md-10'>
                    {products && products.map((product) =>
                        <>
                            <ToastContainer autoClose={2000} />
                            <div className="card m-2" style={{ width: '14rem' }} key={product._id}>
                                <Link to={`/product/${product._id}`} className='text-decoration-none text-white'>
                                    <img src={product.image?.url} className="card-img-top" alt="..." style={{ height: '17rem' }} />
                                </Link>
                                <div className="card-body">
                                    <h5 className="card-title">{product.name.toUpperCase()}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text"><h3>${product.price}</h3></p>
                                    <button className='btn btn-primary' onClick={() => handleAddToCart(product)}><b>Add To Cart</b></button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </Row>
            <Footer />
        </>
    );
}

export default Product;
