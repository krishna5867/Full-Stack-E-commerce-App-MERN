import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Card, Container, Button } from 'reactstrap'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const AllUsers = () => {
    const [users, setUsers] = useState("");
    // console.log(users);

    const getAllUsers = async () => {
        try {
            let token = localStorage.getItem("token");
            const response = await axios.get("/admin/getUsers", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            // console.log(response.data.users);
            if (response.data.status === 200) {
                setUsers(response.data.users);
            } else {
                setUsers(response.data.users);

            }
        } catch (error) {
            console.log(error);
            setUsers([]);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            const canDelete = window.confirm("Are your Sure ?");
            if (canDelete) {
            let token = localStorage.getItem("token");
                const item = await axios.delete(`/admin/deleteuser/${id}`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                if (item.data.status === 200) {
                    toast.success("User Deleted Successfully")
                    getAllUsers();
                }
            }
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [users])
    return (
        <>
            <Row className='p-4'>
                <ToastContainer />
                <Container fluid className='col-lg-3 mb-5'>
                    <Container className='mt-4 mb-5'>
                    </Container>
                    <Button className='w-100 mt-5'><h3><Link to="/admindashboard/orders" className='text-decoration-none text-white'>Order</Link></h3></Button>
                    <Button className='w-100 mt-3'><Link to="/admindashboard/allusers" className='text-decoration-none text-white'><h3 className=''>All Users</h3></Link></Button>
                    <Button className='w-100 mt-3'><h3><Link to="/admindashboard/allproducts" className='text-decoration-none text-white'>All Products</Link></h3></Button>
                    <Button className='w-100 mt-3'><h3><Link to="/admindashboard/addproducts" className='text-decoration-none text-white'>Add Products</Link></h3></Button>
                    <Button className='w-100 mt-3'><h3><Link to="/createcategories" className='text-decoration-none text-white'>Create Category</Link></h3></Button>


                </Container>
                <Container className='col-lg-9' style={{ height: '88vh' }}>
                    <h1>Users</h1>
                    <Container className='mt-3'>
                        <Card style={{ height: '32rem' }}>
                            <div className='mt-2' style={{ height: '300px' }}>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            {/* <th scope="col">S.No</th> */}
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Role</th>
                                            <th scope="col">Created At</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    {users && users.map((item) =>
                                        <tbody>
                                            <tr key={item.id}>
                                                {/* <th scope="row" key={item.id}>{item.id}</th> */}
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.role}</td>
                                                <td>{moment(item.createdAt).format("DD-MM-YYYY")}</td>
                                                <td><div>
                                                    {/* <Button className='bg-primary'>Edit</Button> */}
                                                    <Button className='bg-danger mx-1' onClick={() => handleDeleteUser(item._id)}>Delete</Button>
                                                </div></td>
                                            </tr>
                                        </tbody>
                                    )}
                                </table>
                            </div>
                        </Card>
                    </Container>
                </Container>
            </Row>
        </>
    )
}

export default AllUsers;


