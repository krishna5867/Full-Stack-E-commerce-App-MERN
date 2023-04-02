import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { addToCart } from '../Redux/cartSlice';
import Spinner from './Loading';

const SearchProducts = () => {
    const dispatch = useDispatch();
    const { search } = useParams();
    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(true)

    const fetchSearchProducts = async () => {
        const res = await axios.get(`/search/${search}`);
        // console.log(res.data,"20");
        if (res.status === 200) {
            setProducts(res.data.product)
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
// eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        setLoading(true)
        fetchSearchProducts();
    }, [search])

    return (
        <>
            {
                loading ? (<Spinner />) : (
                    <>
                        {products && products.length !== 0 ? 
                        <>
                        <h3>Product Match&nbsp;
                            <span>({products.length})</span></h3>
                        <div className='d-flex justify-content-center flex-wrap'>
                            {products.map((product) =>
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
                        </> : 
                        <>
                        <div className='mt-5'><h3>Does't Match any result !</h3></div>
                        </>
                        }
                    </>
                )}
        </>
    )
}

export default SearchProducts

