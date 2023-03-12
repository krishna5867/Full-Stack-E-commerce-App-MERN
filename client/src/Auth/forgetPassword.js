import React, { useState } from "react";
import axios from "axios";
import { Form, Container, Card, CardBody, Button, Input, Label } from 'reactstrap'


const ForgetPassword = () => {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleForgetPassword = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/forgotPassword`, {
                email,
            });

            if (res.status === 200) {
                setEmail("")
                setMessage(res.data.message)
            } else {
                if (res.status === 400) {
                    setMessage(res.data.message);
                } else {
                    alert("res.data.message");
                }
            }
        } catch (error) {
            alert(error)
        }
    }
    return (
        <>
            <Container className='mt-5' style={{ width: '30rem' }}>
                <Card className="border border-2 border-warning">
                    <CardBody>
                        <h2>Forget Password</h2>
                        <h4 className="text-success mt-2">{message}</h4>
                        <Form onSubmit={handleForgetPassword} className='mt-5'>
                            <div className='d-flex flex-column justify-content-start align-items-start mt-3'>
                                <Label htmlFor="email">Enter Email &nbsp; </Label>
                                <Input type="text" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <Button className='bg-primary mt-4 mb-3 w-100'><b>Send Link</b></Button> <br />
                            <p><a href="/login">Back</a></p>
                        </Form>
                    </CardBody>
                </Card>
            </Container>
        </>
    )

}

export default ForgetPassword;