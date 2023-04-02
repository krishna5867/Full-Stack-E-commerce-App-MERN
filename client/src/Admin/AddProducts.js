import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Row, Form, Container, Card, Button, Input } from 'reactstrap'
import Spinner from '../Component/Loading.js';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const AddProducts = () => {
    const [showspin, setShowSpin] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState("");
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", name);
        data.append("description", description);
        data.append("price", price);
        data.append("stock", stock);
        data.append("photo", image);
        data.append("category", category)
        setShowSpin(true)
        try {
            const res = await axios.post('/admin/addproduct', data);
            if (res.status === 200) {
                setShowSpin(true)
                toast.success("Item Added Successfully")
                setName("")
                setDescription("")
                setPrice("")
                setStock("")
                setImage("")
                category("")
                if (res.status === 400) {
                    toast.error("You are not authorized")
                }
            } else {
                alert("You are not authorized")
            }
        } catch (error) {
            console.log(error.message);
        }
        setShowSpin(false)
    }

    const fetchCategory = async () => {
        const res = await axios.get('/getAllCategory');
        // console.log(res.data, '55');
        if (res.status === 200) {
            setCategories(res.data.category)
        }
    }
    useEffect(() => {
        fetchCategory();
    }, []);

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
                    <h1>Add Products</h1>
                    <Container className='mt-3'>
                        {/* Content */}
                        {/* <Card style={{ height: '32rem' }}> */}
                            <div className='mt-2' style={{ height: '350px' }}>
                                {/* <Container className='mt-2' style={{ width: '30rem' }}> */}
                                    {/* Spinner */}
                                    {showspin ? <Spinner /> : null}
                                    <Card className="border p-4 shadow-lg bg-white rounded">
                                            {/* <h2>Add Products</h2> */}
                                            <Form onSubmit={handleSubmit} encType="multipart/form-data" className="mt-3">
                                                <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                                <Input type="text" placeholder="Description" className="mt-4" value={description} onChange={(e) => setDescription(e.target.value)} />
                                                {/* categories */}
                                                <select
                                                    placeholder="Select a category"
                                                    size="large"
                                                    className="form-select mt-4"
                                                    onChange={(e) => {setCategory(e.target.value)}}
                                                    >
                                                    {categories?.map((c) => (
                                                        <option key={c._id} value={c._id}>
                                                            {c.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {/* <Input type="text" placeholder="categories..." className="mt-4" value={categories} onChange={(e) => setCategories(e.target.value)} /> */}
                                                <Input type="number" placeholder="Price" className="mt-4" value={price} onChange={(e) => setPrice(e.target.value)} />
                                                <Input type="number" placeholder="Stock" className="mt-4" value={stock} onChange={(e) => setStock(e.target.value)} />
                                                <Input type="file" name="photo" className="mt-4" onChange={(e) => setImage(e.target.files[0])} />
                                                <Button className='bg-primary mt-4 mb-3 w-100'>Add</Button>
                                            </Form>
                                    </Card>
                                {/* </Container> */}
                            </div>
                        {/* </Card> */}
                    </Container>
                </Container>
            </Row>

        </>
    )
}

export default AddProducts;