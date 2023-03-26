import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Card, Container, Button } from 'reactstrap'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../Component/Loading';

const AllProducts = () => {
    const [products, setProducts] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true)

    const getProducts = async () => {
        const res = await axios.get(`/getProducts?page=${currentPage}`);
        if (res.status === 200) {
            setProducts(res.data.product);
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            const candelete = window.confirm("Are You Sure ?");
            if (candelete) {
                const res = await axios.delete(`/admin/deleteproduct/${id}`);
                if (res.status === 200) {
                    toast.success("Deleted Successfully")
                    getProducts();
                }
            }
        } catch (error) {
            alert(error);

        }
    }

    const fetchTotalProductsCount = async () => {
        const res = await axios.get("/productCount");
        if (res.status === 200) {
            setTotalPages(Math.ceil((res.data.totalCount) / 5));
        }
    }

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
        getProducts();
        fetchTotalProductsCount()
    }, [currentPage])
    return (
        <>
            <Row className='p-4'>
                <ToastContainer autoClose={2000} />
                <Container fluid className='col-lg-3 mb-5'>
                    <Container className='mt-4 mb-5'>
                    </Container>
                    <Button className='w-100 mt-5'><h3><Link to="/admindashboard/orders" className='text-decoration-none text-white'>Order</Link></h3></Button>
                    <Button className='w-100 mt-3'><h3><Link to="/admindashboard/allusers" className='text-decoration-none text-white'>All Users</Link></h3></Button>
                    <Button className='w-100 mt-3'><h3><Link to="/admindashboard/allproducts" className='text-decoration-none text-white'>All Products</Link></h3></Button>
                    <Button className='w-100 mt-3'><h3><Link to="/admindashboard/addproducts" className='text-decoration-none text-white'>Add Products</Link></h3></Button>
                    <Button className='w-100 mt-3'><h3><Link to="/createcategories" className='text-decoration-none text-white'>Create Category</Link></h3></Button>
                </Container>
                <Container className='col-lg-9' style={{ height: '88vh' }}>
                    <h1>All Products</h1>
                    <Container className='mt-3'>
                        <Card>
                            <div className='mt-2'>
                                {/* Content */}
                                <div className='mt-2'>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                {/* <th scope="col">Sno</th> */}
                                                <th scope="col">Name</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Stock</th>
                                                <th scope="col">Created At</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        {products && products.map((item, index) =>
                                            <tbody>
                                                <tr key={item.id}>
                                                    {/* <td>{index + 1}</td> */}
                                                    <td>{item.name}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.stock}</td>
                                                    <td>{moment(item.createdAt).format("DD-MM-YYYY")}</td>
                                                    <td><div>
                                                        <button className='btn btn-success'><Link to={`/admindashboard/editproduct/${item._id}`} className='text-decoration-none text-white'>Edit</Link></button>
                                                        <button className='btn btn-danger mx-1' onClick={() => handleDelete(item._id)}>Delete</button>
                                                    </div></td>
                                                </tr>
                                            </tbody>
                                        )}
                                    </table>
                                </div>
                            </div>
                        </Card>
                    </Container>
                    <div className="mt-5">
                    {products && totalPages && (
                        <>
                            <button className="btn btn-warning" onClick={handlePrev}>
                                {loading ? "Loading ..." : "Prev"}
                            </button> &nbsp; {currentPage} &nbsp;
                            <button className="ms-2 btn btn-warning" onClick={handleNext}>
                                {loading ? "Loading ..." : "Next"}
                            </button>
                        </>
                    )}
                    </div>
                </Container>
            </Row>
        </>
    )
}

export default AllProducts;


