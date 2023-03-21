import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from '../Redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from './Loading';


const AllProducts = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState("");
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
            {
                loading ? (<Spinner />) : (
                    <>
                        <div className='mt-5 d-flex justify-content-between align-items-center px-5'>
                            <div className='px-md-4'><h2>All Products</h2></div>
                            <div className='px-md-5'>
                                <select name="" id="">
                                    <option value="New">Default</option>
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
                                        <div className="shadow-lg m-2 mb-5 bg-white rounded card-img-top" key={product._id}>
                                            <Link to={`/product/${product._id}`} className='text-decoration-none text-white'>
                                                <img src={product.image?.url} className="w-full" alt="..." style={{ height: '18rem' }} />
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
                    </>
                )}
        </>

    )
}

export default AllProducts
