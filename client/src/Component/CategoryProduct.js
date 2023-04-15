import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addToCart } from '../Redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from './Loading';


const CategoryProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedCategory } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)

    const [categories, setCategories] = useState([]);
    // eslint-disable-next-line
    const [selectedProductCategory, setSelectedProductCategory] = useState("");


    const fetchCategoryList = async () => {
        const res = await axios.get(`/getAllCategory`);
        if (res.status === 200) {
            setCategories(res.data.category)
        }
    }

    const fetchCategory = async () => {
        try {
            const res = await axios.get(`/category/${selectedCategory}`);
            if (res.status === 200) {
                setProducts(res.data.product)
                setLoading(false)

            }
        } catch (error) {
            console.log(error.message);
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
        fetchCategoryList()
        fetchCategory()
    }, [selectedCategory])



    return (
        <>
            {
                loading ? <Spinner /> : (
                    <>
                        {products && products.length !== 0 ?
                            <>
                                <h3>CategoryProduct</h3>
                                <div className='mt-2 d-flex justify-content-between align-items-center px-5'>
                                    <div className='px-md-4'><h2>All Products</h2></div>
                                    <div className='px-md-5'>
                                        <select placeholder="Select a category" size="large" className="form-select"
                                            onChange={(e) => {
                                                const categoryId = e.target.value;
                                                setSelectedProductCategory(categoryId);
                                                navigate(`/category/${categoryId}`);
                                            }}>
                                            {categories?.map((c) => (
                                                <option key={c._id} value={c.name}>
                                                    {c.name}
                                                </option>
                                            ))}
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
                            </> :
                            <>
                                <div className='mt-5'><h3>Does't Match any result !</h3></div>
                            </>
                        }
                    </>)
            }
        </>
    )
}

export default CategoryProduct