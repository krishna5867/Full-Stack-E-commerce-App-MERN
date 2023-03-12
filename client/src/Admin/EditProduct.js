import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Row, Form, Container, Card, CardBody, Button, Input } from 'reactstrap'
import { Link, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const EditProducts = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    // console.log(name);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState("");
    // console.log(image);
    const getProduct = async () => {
        const res = await axios.get(`/getproduct/${id}`);
        // console.log(res.data);
        if (res.status === 200) {
            setName(res.data.product.name)
            setDescription(res.data.product.description)
            setPrice(res.data.product.price)
            setStock(res.data.product.stock)
            setImage(res.data.product?.image?.url)
        } else {
            console.log("error in updating product");
        }
    }
    useEffect(() => {
        getProduct()
    })

    const handleUpdate = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", name);
        data.append("description", description);
        data.append("price", price);
        data.append("stock", stock);
        data.append("photo", image);
        // console.log(data);
        try {
            const res = await axios.put(`/admin/editproduct/${id}`, data);
            if (res.status === 200) {
                toast.success("Updated Successfully")
                setName("")
                setDescription("")
                setPrice("")
                setStock("")
                setImage("")
            } else if (res.status === 400) {
                toast.error("You are not authorized");
            } else {
                toast.error("Error updating item");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <Row className='p-4'>
                <ToastContainer autoClose={2000} />
                <Container fluid className='col-lg-3 mb-5'>
                    <Container className='mt-4 mb-5'>
                    </Container>
                    <Button className='w-100 mt-5'><h3><Link to="/admindashboard" className='text-decoration-none text-white'>Order</Link></h3></Button>
                    <Button className='w-100 mt-3'><h3><Link to="/admindashboard/allusers" className='text-decoration-none text-white'>All Users</Link></h3></Button>
                    <Button className='w-100 mt-3'><h3><Link to="/admindashboard/allproducts" className='text-decoration-none text-white'>All Products</Link></h3></Button>
                    <Button className='w-100 mt-3'><h3><Link to="/admindashboard/addproducts" className='text-decoration-none text-white'>Add Products</Link></h3></Button>
                </Container>
                <Container className='col-lg-9' style={{ height: '88vh' }}>
                    <h1>Edit Products</h1>
                    <Container className='mt-3'>
                        {/* Content */}
                        <Card style={{ height: '32rem' }}>
                            <div className='mt-2' style={{ height: '300px' }}>
                                <Container className='mt-2' style={{ width: '30rem' }}>
                                    <Card className="border border-2 border-warning mt-4">
                                        <CardBody>
                                            <Form onSubmit={handleUpdate} encType="multipart/form-data" className="mt-3">
                                                {/* <Label htmlFor="name">Name</Label> */}
                                                <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                                {/* <Label htmlFor="description">Description</Label> */}
                                                <Input type="text" placeholder="Description" className="mt-4" value={description} onChange={(e) => setDescription(e.target.value)} />
                                                {/* <Label htmlFor="price">Price</Label> */}
                                                <Input type="number" placeholder="Price" className="mt-4" value={price} onChange={(e) => setPrice(e.target.value)} />
                                                {/* <Label htmlFor="stock">Stock</Label> */}
                                                <Input type="number" placeholder="Stock" className="mt-4" value={stock} onChange={(e) => setStock(e.target.value)} />
                                                {/* <Label htmlFor="photo">Image</Label> */}
                                                <Input type="file" name="photo" className="mt-4" onChange={(e) => setImage(e.target.files[0])} />
                                                <Button className='bg-primary mt-4 mb-3 w-100'>Update</Button>
                                            </Form>
                                        </CardBody>
                                    </Card>
                                </Container>
                            </div>
                        </Card>
                    </Container>
                </Container>
            </Row>
        </>
    )
}

export default EditProducts;