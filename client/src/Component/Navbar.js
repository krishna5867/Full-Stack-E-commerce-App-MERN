import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { loggedInUser, logout } from '../Redux/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    console.log(`isLoggedIn-> ${isLoggedIn}`);
    console.log(`user-> ${user}`);
    const cartItems = useSelector((state) => state.cart.items);
    // eslint-disable-next-line
    const fetchLoggedInUser = async () => {
        try {
            const res = await axios.get('/isloggedIn');
            if (res.status === 200) {
                dispatch(
                    loggedInUser({
                        isLoggedIn: true,
                        user: res.data,
                    })
                );

            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchLoggedInUser();
    }, [fetchLoggedInUser]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top px-4">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <h3>
                        <b>
                            Tshirt <span className="text-warning">Store</span>
                        </b>
                    </h3>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">

                    <div className="d-flex md:justify-content-center mt-2 justify-content-around">
                        {/* loggedin user name*/}
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/profile">
                                        <span>{user.email}</span>
                                        {user ? <i className="fa fa-angle-down" aria-hidden="true"></i> : ''}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">
                                        <button className="btn btn-light text-dark rounded mx-2" onClick={() => dispatch(logout())}>
                                            <b>Logout</b>
                                        </button>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/login">
                                        <button className="btn btn-light text-dark rounded mx-2">
                                            <b>Login</b>
                                        </button>
                                    </Link>
                                </li>
                            </>
                        )}
                        {/* check if user */}
                        {user && user.role === 'admin' ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/admindashboard/allusers">
                                        <button className="btn btn-light text-dark rounded mx-2">
                                            <b>Admin</b>
                                        </button>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            ''
                        )}
                        {/* Cart Icon */}
                        <li className="nav-item position-relative">
                            <Link className="nav-link" to="/cart">
                                <i className="fas fa-cart-plus fa-2x text-white"></i>
                                <span className="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-white text-black">
                                    {cartItems.length}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </Link>
                        </li>
                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar

