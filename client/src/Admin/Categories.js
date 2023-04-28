import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Row, Container, Card, CardBody, Button, Input } from 'reactstrap'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment'

const Categories = () => {
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);

    const fetchCategory = async () => {
        const res = await axios.get('/getAllCategory');
        if (res.status === 200) {
            setCategories(res.data.category)
        }
    }
    const handleCreateCategory = async () => {
        try {
            let token = localStorage.getItem("token");
            const response = await axios.post("/createCategory", { name }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.data.status === 200) {
                setCategories(response.data.category);
                setName('')
            } else {
                setCategories();

            }
        } catch (error) {
            console.log(error);
            setCategories([]);
        }
    }
    // const handleEditCategory = async (id) => {
    //     try {
    //         let token = localStorage.getItem("token");
    //         const response = await axios.put(`/editCategory/${id}`,{ name }, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             }
    //         });
    //         console.log(response.data);
    //         if (response.data.status === 200) {
    //         setName(response.data.category.name);
    //             toast.success("Edited Successfully")
    //         }
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    const handleDeleteCategory = async (id) => {
        try {
            let token = localStorage.getItem("token");
            const response = await axios.delete(`/deleteCategory/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.data.status === 200) {
                // fetchCategory();
                toast.success("Deleted Successfully")

            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchCategory();
    }, [categories]);

    return (
        <>
            <Row className='p-4'>
                <ToastContainer />
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
                    <h1>Create Category</h1>
                    <Container className='mt-3'>
                        <Card style={{ height: '32rem' }}>
                            <Container className='mt-2' style={{ width: '50rem' }}>
                                <CardBody className='d-flex justify-content-between'>
                                    <Input type='text' placeholder='Enter Category Name' value={name} onChange={(e) => setName(e.target.value)}></Input>
                                    <button className='btn btn-lg btn-primary ms-3' onClick={handleCreateCategory}>Create</button>
                                </CardBody>
                                <div className='mt-2' style={{ height: '300px' }}>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Category</th>
                                                <th scope="col">Created At</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        {categories && categories.map((item) =>
                                            <tbody>
                                                <tr key={item.id}>
                                                    <td><h5>{item.name}</h5></td>
                                                    <td>{moment(item.createdAt).format("DD-MM-YYYY")}</td>
                                                    <td>
                                                        <div>
                                                            {/* <Button className='bg-primary' onClick={() => handleEditCategory(item._id)}>Edit</Button> */}
                                                            <Button className='bg-danger mx-1' onClick={() => handleDeleteCategory(item._id)}>Delete</Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )}
                                    </table>
                                </div>
                            </Container>
                        </Card>
                    </Container>
                </Container>
                {/*  */}


            </Row>
        </>
    )
}

export default Categories