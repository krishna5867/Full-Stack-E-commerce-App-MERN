import React, { useEffect, useContext } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Card, CardBody } from 'reactstrap'
import moment from 'moment'
import { Auth } from '../Context/isloggedin'
import { ToastContainer, toast } from 'react-toastify';


const Profile = () => {
    const navigate = useNavigate();
    const { isloggedIn, setIsloggedIn } = useContext(Auth);
    // eslint-disable-next-line
    const fetchisloggedUser = async () => {
        const res = await axios.get("/isloggedIn");
        console.log(res.data);

        if(res.status === 200){
            setIsloggedIn(res.data)
        }
    }
    const handleSignout = async () => {
        localStorage.removeItem("usertoken");
        const res = await axios.get("/signout");
        if (res.status === 200) {
            setIsloggedIn("")
            toast.success("Logout Successfully")
            navigate('/login')
            window.location.reload();
        }
    }
    useEffect(() => {
        fetchisloggedUser()
    }, [fetchisloggedUser])

    return (
        <div style={{height: '80vh'}}>
        <ToastContainer />
        <Container className='mt-5' style={{width: '30rem'}}>
            <Card className="border border-2 border-warning">
                {
                    isloggedIn ? 
                    <>
                <CardBody className='m-4'>
                <div className='d-flex'>
                    <div><h3>Name:- &nbsp; </h3></div>
                    <div><h3 className='text-uppercase'>{isloggedIn.loggedInUser?.name}</h3></div>
                </div>
                <div className='d-flex'>
                    <div><h3>Email:- &nbsp; </h3></div>
                    <div><h3>{isloggedIn.loggedInUser?.email}</h3></div>
                </div>
                <div className='d-flex'>
                    <div><h3>Role:- &nbsp; </h3></div>
                    <div><h3>{isloggedIn.loggedInUser?.role}</h3></div>
                </div>
                <div className='d-flex'>
                    <div><h4>Created:- &nbsp; </h4></div>
                    <div><h4>{moment(isloggedIn.loggedInUser?.createdAt).format("DD-MM-YYYY")}</h4></div>
                </div>
                <div className='d-flex justify-content-between'>
                <button className='btn btn-dark mt-3'><Link to={`/changepassword`} className='text-decoration-none text-white'>Change Password</Link></button>
                <button className='btn btn-danger mt-3' onClick={handleSignout}>Logout</button>
                </div>
                </CardBody>
                </>
                : "You Are Not LoggedIn"
                }
            </Card>
        </Container>
        </div>
    )
}

export default Profile