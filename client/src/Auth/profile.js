import React, {useContext} from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Row, Container, Card, CardBody, Button } from 'reactstrap';
import moment from 'moment';
import { LoginContext } from "../Context/authContext";

const Profile = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { logindata, setLoginData } = useContext(LoginContext);
    const handleSignout = async () => {
        let token = localStorage.getItem("token");

        const response = await axios.get("/signout", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${token}`
            },
            credentials: "include"
        });
        if (response.data.status === 201) {
            localStorage.removeItem("token");
            setLoginData(false)
            console.log("user logout");
            navigate("/login");
        } else {
            console.log("error in signout");
        }
    }

    return (
        <>
            <Row className='p-4'>
                <Container fluid className='col-lg-3 mb-5'>
                    <Container className='mt-4 mb-5'>
                    </Container>
                    <Button className='w-100 mt-5 bg-'><h3><Link to="" className='text-decoration-none text-white'>Profile</Link></h3></Button>
                    <Button className='w-100 mt-3'><h3><Link to={`/myorder/${id}`} className='text-decoration-none text-white'>Order</Link></h3></Button>
                </Container>
                <Container className='col-lg-9' style={{ height: '88vh' }}>
                    <h1>Orders</h1>
                    <Container className='mt-3'>
                        <Card style={{ height: '32rem' }}>
                            <div className='mt-2' style={{ height: '300px' }}>
                                {/* Content */}
                                {logindata && logindata ? (
                                    <>
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Role</th>
                                                    <th scope="col">Created At</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{logindata.validUser.name}</td>
                                                    <td>{logindata.validUser.email} </td>
                                                    <td> {logindata.validUser.role}</td>
                                                    <td>{moment(logindata.validUser.createdAt).format('DD-MM-YYYY')}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <button className='btn btn-dark mt-5 mx-5'>
                                            <Link
                                                to={`/changepassword`}
                                                className='text-decoration-none text-white'>
                                                Change Password
                                            </Link>
                                        </button>
                                        <button className='btn btn-danger mt-5 mx-5' onClick={handleSignout}>
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <CardBody className='m-4'>
                                        <h4>You Are Not Logged In</h4>
                                        <Link to='/login' className='btn btn-primary mt-3'>
                                            Login
                                        </Link>
                                    </CardBody>
                                )}
                            </div>
                        </Card>
                    </Container>
                </Container>
            </Row>
        </>
    );
};

export default Profile;
