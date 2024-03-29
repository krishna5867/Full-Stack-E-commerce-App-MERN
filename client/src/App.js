import './App.css';
import React, { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
// Component
import Navbar from './Component/Navbar';
import Product from './Component/Products';
import SingleProduct from './Component/SingleProduct';
import Cart from './Component/Cart';
import PageNotFound from './Component/PageNotFound';
import SearchProducts from './Component/SearchProducts';
import Order from './Component/Order';
import ExploreProducts from './Component/AllProducts';
import CategoryProduct from './Component/CategoryProduct';

// Protected Route
import PrivateRoute from './Component/PrivateRoute';
// Auth
import Login from './Auth/login';
import Signup from './Auth/signup';
import Profile from './Auth/profile';
import ForgetPassword from './Auth/forgetPassword';
import ChangePassword from './Auth/changePassword';
import PasswordReset from './Auth/passwordReset';
import MyOrder from './Auth/myOrder';

// Admin
import AdminDashboard from './Admin/AdminDashboard';
import AddProducts from './Admin/AddProducts';
import EditProducts from './Admin/EditProduct';
import AllUsers from './Admin/AllUsers';
import AllProducts from './Admin/AllProducts';
import Orders from './Admin/Order';
import Categories from './Admin/Categories';
import OrderDetails from './Admin/OrderDetails';
import BuyerDetails from './Admin/Buyer';
import { LoginContext } from "./Context/authContext";

function App() {
    const { logindata, setLoginData } = useContext(LoginContext);
    // console.log(logindata);

    const validUser = async () => {
        const token = localStorage.getItem('token');
        // console.log('token->', token);
    
        const response = await axios.get("/validuser", {
            headers: { 
                Authorization: `Bearer ${token}` 
            },
        });
    
        // console.log(response.data);
    
        if (response.data.status === 401 || !response.data) {
            console.log("user not valid");
        } else {
            setLoginData(response.data)
        }
    }
    

        useEffect(() => {
            setTimeout(() => {
                validUser()
            }, 2000)
        }, [])

        return (
            <div className="App">
                <>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Product />}></Route>
                        <Route path="/profile/:id" element={<PrivateRoute Component={Profile} />} />
                        <Route path="/admindashboard" element={<PrivateRoute Component={AdminDashboard} />} />
                        <Route path="/admindashboard/allproducts" element={<PrivateRoute Component={AllProducts} />} />
                        <Route path="/admindashboard/allusers" element={<PrivateRoute Component={AllUsers} />} />
                        <Route path="/admindashboard/addproducts" element={<PrivateRoute Component={AddProducts} />} />
                        <Route path="/admindashboard/orders" element={<PrivateRoute Component={Orders} />} />
                        <Route path="/admindashboard/editproduct/:id" element={<PrivateRoute Component={EditProducts} />} />
                        <Route path="/product/:id" element={<SingleProduct />} />
                        <Route path="/cart" element={<PrivateRoute Component={Cart} />} />
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/signup" element={<Signup />}></Route>
                        <Route path="/forgetPassword" element={<ForgetPassword />} />
                        <Route path="/passwordReset/:token" element={<PasswordReset />} />
                        <Route path="/changepassword" element={<ChangePassword />} />
                        <Route path="*" element={<PageNotFound />} />
                        <Route path="/order/:orderId/:paymentId/:signature" element={<Order />} />
                        <Route path="/search/:search" element={<SearchProducts />} />
                        <Route path="/products" element={<ExploreProducts />} />
                        <Route path="/createcategories" element={<Categories />} />
                        <Route path="/category/:selectedCategory" element={<CategoryProduct />} />
                        <Route path="/getProductByCategory/:selectedCategory" element={<CategoryProduct />} />
                        <Route path="/orderDetails/:id" element={<OrderDetails />} />
                        <Route path="/buyerDetails/:id" element={<BuyerDetails />} />
                        <Route path="/myOrder/:id" element={<MyOrder />} />
                    </Routes>
                </>
            </div>
        );
    }

    export default App;



