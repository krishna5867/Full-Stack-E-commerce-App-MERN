import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from '../Context/isloggedin'
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Navbar = () => {
    const { isloggedIn, setIsloggedIn } = useContext(Auth);
    const cartItems = useSelector((state) => state.cart.items);
    console.log(isloggedIn);

    // eslint-disable-next-line
    const fetchisloggedUser = async () => {
        localStorage.getItem("usertoken");
        const res = await axios.get('/isloggedin');
        if (res.status === 200) {
            setIsloggedIn(res.data);
        }
    }
    useEffect(() => {
        fetchisloggedUser()
    },[fetchisloggedUser])

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top px-4">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><h3> <b>Tshirt <span className='text-warning'>Store</span></b></h3></Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

            </div>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <div className='d-flex md:justify-content-center mt-2 justify-content-around'>
                        {/* loggedin user name*/}
                        {isloggedIn ?
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/profile">
                                        <span>{isloggedIn.loggedInUser?.name.toUpperCase()}</span>
                                        {isloggedIn.loggedInUser ?
                                            <i className="fa fa-angle-down" aria-hidden="true"></i> : ""}
                                    </Link>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/login"><button className='btn btn-light text-dark rounded mx-2'><b>Login</b></button></Link>
                                </li>
                            </>
                        }
                        {/* check if user */}
                        {
                            isloggedIn.loggedInUser?.role === 'admin' ?
                                (<>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/admindashboard/allusers"><button className='btn btn-light text-dark rounded mx-2'><b>Admin</b></button></Link>
                                    </li>
                                </>) :
                                ""
                        }
                        <li className="nav-item position-relative">
                            <Link className="nav-link" to="/cart"><i className="fas fa-cart-plus fa-2x text-white"></i>
                                <span className="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-white text-black">{cartItems.length}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </Link>
                        </li>
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
