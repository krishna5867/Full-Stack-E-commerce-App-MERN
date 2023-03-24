import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Card, CardBody } from 'reactstrap';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { logout } from '../Redux/authSlice';

const Profile = () => {
    const [order, setOrder] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    // console.log(`isLoggedIn-> ${isLoggedIn}`);
    const fetchOrder = async () => {
        const res = await axios.get("/myOrder");
        console.log(res);
        if(res.status === 200){
            setOrder(res.data.order)
        }
    }

    const handleSignout = async () => {
        try {
            localStorage.removeItem("usertoken");
        } catch (error) {
            console.log("Error removing item from localStorage: ", error.message);
        }

        try {
            await axios.get('/signout');
            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchOrder()
    }, []);
    return (
        <div style={{ height: '80vh' }}>
            <ToastContainer />
            <Container className='mt-5' style={{ width: '30rem' }}>
                <Card className='border m-2 p-4 shadow-lg bg-white rounded'>
                    {isLoggedIn ? (
                        <>
                            <CardBody className='m-4'>
                                <div className='d-flex'>
                                    <div>
                                        <h3>Name:- &nbsp; </h3>
                                    </div>
                                    <div>
                                        <h3 className='text-uppercase'>{user.name}</h3>
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <div>
                                        <h3>Email:- &nbsp; </h3>
                                    </div>
                                    <div>
                                        <h3>{user.email}</h3>
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <div>
                                        <h3>Role:- &nbsp; </h3>
                                    </div>
                                    <div>
                                        <h3>{user.role}</h3>
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <div>
                                        <h3>Order:- &nbsp; </h3>
                                    </div>
                                    <div>
                                        <h3>{order}</h3>
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <div>
                                        <h4>Created:- &nbsp; </h4>
                                    </div>
                                    <div>
                                        <h4>
                                            {moment(user.createdAt).format('DD-MM-YYYY')}
                                        </h4>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <button className='btn btn-dark mt-3'>
                                        <Link
                                            to={`/changepassword`}
                                            className='text-decoration-none text-white'>
                                            Change Password
                                        </Link>
                                    </button>
                                    <button className='btn btn-danger mt-3' onClick={handleSignout}>
                                        Logout
                                    </button>
                                </div>
                            </CardBody>
                        </>
                    ) : (
                        <CardBody className='m-4'>
                            <h4>You Are Not Logged In</h4>
                            <Link to='/login' className='btn btn-primary mt-3'>
                                Login
                            </Link>
                        </CardBody>
                    )}
                </Card>
            </Container>
        </div>
    );
};

export default Profile;
