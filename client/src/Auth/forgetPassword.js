import React, { useState } from "react";
import axios from "axios";
import { Form, Container, Card, CardBody, Button, Input, Label } from 'reactstrap'
import { Link } from 'react-router-dom';
import Spinner from '../Component/Loading';


const ForgetPassword = () => {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false)


    const handleForgetPassword = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const res = await axios.post(`/forgotPassword`, {
                email,
            });
            setEmail("")
            setMessage(res.data.message)
        } catch (error) {
            setMessage(error.response.data.message);
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <>
            {loading && <Spinner />}
            <Container className='mt-5' style={{ width: '30rem' }}>
                <Card className="border m-2 p-4 shadow-lg bg-white rounded">
                    <CardBody>
                        <h2>Forget Password</h2>
                        <h4 className="text-success mt-2">{message}</h4>
                        <Form onSubmit={handleForgetPassword} className='mt-5'>
                            <div className='d-flex flex-column justify-content-start align-items-start mt-3'>
                                <Label htmlFor="email">Enter Email &nbsp; </Label>
                                <Input type="text" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <Button className='bg-primary mt-4 mb-3 w-100'><b>Send Link</b></Button> <br />
                            <p><Link to="/login">Back</Link></p>
                        </Form>
                    </CardBody>
                </Card>
            </Container>
        </>
    )

}

export default ForgetPassword;
