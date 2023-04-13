import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState([]);
    // const { user } = useSelector((state) => state.auth);
    const cartItems = useSelector((state) => state.cart.items);

    const [userId, setUserId] = useState();
    
    //LocalStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user && user.role === 'admin';
    const isLoggedIn = !!user;
    // const userId = user && user._id;
    console.log("id",userId);

    const validUser = async () => {
        try {
            const res = await axios.get('/isloggedin');
            if (res.status === 200) {
                setUserId(res.data.user._id);
            }
        } catch (error) {
            setUserId(null);
        }
    };


    useEffect(() => {
        validUser()
    },[isLoggedIn])

    const handleSearch = async (e) => {
        if ((e.key === "Enter") && searchQuery?.length > 0) {
            navigate(`/search/${searchQuery}`)
        }
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top px-4 md:height-3">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <h3>
                        <b>
                            Tshirt <span className="text-warning">Store</span>
                        </b>
                    </h3>
                </Link>
                <Input type="text" className='w-50 mt-1 mx-auto' placeholder='Search' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyUp={handleSearch} style={{ height: '40px' }} />
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
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={`/profile/${userId}`}>
                                    <div className="avatar bg-white text-black rounded-circle align-items-center d-flex justify-content-center" style={{ width: '40px', height: ' 40px' }}>
                                        {user.name && <b>{user.name.substring(0, 2).toUpperCase()}</b>}
                                    </div>
                                </Link>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/login">
                                    <button className="btn btn-light text-dark rounded mx-2">
                                        <b>Login</b>
                                    </button>
                                </Link>
                            </li>
                        )}


                        {/* check if user */}
                        {isAdmin && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/admindashboard/allusers">
                                        <button className="btn btn-light text-dark rounded mx-2">
                                            <b>Admin</b>
                                        </button>
                                    </Link>
                                </li>
                            </>
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

