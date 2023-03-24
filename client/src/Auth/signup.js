import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Container, Card, CardBody, Button, Input, Label } from 'reactstrap'
import { ToastContainer, toast} from 'react-toastify'
import { Link } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post('/createUser', {
                name, email, password
            })
            if (res.status === 200) {
                navigate("/login");
                alert("Register Successful")
            }
        } catch (error) {
            toast.error("Invalid Credincials")
        }
    }
    return (
        <>
        <ToastContainer />
            <Container className='mt-5' style={{ width: '30rem' }}>
                <Card className="border m-2 p-4 shadow-lg bg-white rounded">
                    <CardBody>
                        <h2>Registration Form</h2>
                        <Form onSubmit={handleSignup} className='mt-5'>
                            <div className='d-flex flex-column justify-content-start align-items-start mt-3'>
                                <Label htmlFor="name">Enter Name</Label>
                                <Input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='d-flex flex-column justify-content-start align-items-start mt-3'>
                                <Label htmlFor="email">Enter Email</Label>
                                <Input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}  />
                            </div>
                            <div className='d-flex flex-column justify-content-start align-items-start mt-3'>
                                <Label htmlFor="password">Enter Password</Label>
                                <Input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <Button className='bg-primary mt-4 mb-3 w-100'>Signup</Button>
                            <p>Already have account <Link to="/login">Login Here</Link></p>
                            <p><a href='/forgetPassword'>Forget Password </a></p>
                        </Form>
                    </CardBody>
                </Card>
            </Container>
        </>
    )

}

export default Signup;