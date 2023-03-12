import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Container, Card, CardBody, Button, Input, Label } from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify';
import { Auth } from '../Context/isloggedin';

const Login = () => {
    const { isloggedIn, setIsloggedIn } = useContext(Auth);
    console.log(isloggedIn);

    const [email, setEmail] = useState("admin@admin.com");
    const [password, setPassword] = useState("password");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/login', {
                email, password
            })
            if (res.status === 200) {
                setIsloggedIn(res.data)
                localStorage.setItem("usertoken", res.data.token);
                navigate("/");
                alert("Login Success")
                // window.location.reload();
            }
        } catch (error) {
            toast.error("Invalid credentials")
        }
    }
    return (
        <>
            <ToastContainer />
            <Container className='mt-5' style={{ width: '30rem' }}>
                <Card className="border border-2 border-warning">
                    <CardBody>
                        <h2>Login Form</h2>
                        <Form onSubmit={handleLogin} className='mt-5'>
                            <div className='d-flex flex-column justify-content-start align-items-start'>
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='d-flex flex-column justify-content-start align-items-start mt-3'>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <Button className='bg-primary mt-4 mb-3 w-100'>Login</Button>
                            <p>Don't have Account <a href="signup">Create New Account</a></p>
                            <p><a href='/forgetPassword'>Forget Password </a></p>
                        </Form>

                    </CardBody>
                </Card>
            </Container>
        </>
    )

}

export default Login;
