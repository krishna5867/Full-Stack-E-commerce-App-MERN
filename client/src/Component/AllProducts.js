import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from '../Redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from './Loading';

const AllProducts = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchCategory = async () => {
        const res = await axios.get(`/getAllCategory?page=${currentPage}`);
        if (res.status === 200) {
            setCategories(res.data.category)
        }
    }

    const fetchProducts = async () => {
        const res = await axios.get(`/getProducts?page=${currentPage}`);
        if (res.status === 200) {
            setProducts(res.data.product);
            setLoading(false)
        }
    }
    
    const fetchTotalProductsCount = async () => {
        const res = await axios.get("/productCount");
        if (res.status === 200) {
            setTotalPages(Math.ceil((res.data.totalCount) / 5));
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

    const handleNext = () => {
        if (currentPage === totalPages) return;
        else {
            setCurrentPage(currentPage + 1)
        }
    }
    const handlePrev = () => {
        if (currentPage === 1) return;
        else {
            setCurrentPage(currentPage - 1)
        }
    }

    useEffect(() => {
        setLoading(true)
        fetchProducts();
        fetchCategory();
        fetchTotalProductsCount()
    }, [currentPage])


    return (
        <>
            {
                loading ? (<Spinner />) : (
                    <>

                        <div className='mt-2 d-flex justify-content-between align-items-center px-5'>
                            <div className='px-md-4'><h2>All Products</h2></div>
                            <div className='px-md-5'>
                                <select placeholder="Select a category" size="large" className="form-select"
                                    onChange={(e) => {
                                        const categoryId = e.target.value;
                                        setSelectedCategory(categoryId);
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
                    </>
                )}
            {products && totalPages && (
                <>
                    <button className="btn btn-warning" onClick={handlePrev}>
                        {loading ? "Loading ..." : "Prev"}
                    </button> &nbsp; {currentPage} &nbsp;
                    <button className="ms-2 btn btn-warning" onClick={handleNext}>
                        {loading ? "Loading ..." : "Next"}
                    </button>
                </>
            )} <br />
            {/* Total No of Pages: {totalPages} */}
        </>

    )
}

export default AllProducts
