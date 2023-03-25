import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import {Form, Container, Card, CardBody, Button, Input} from 'reactstrap'

const PasswordReset = () => {
    const navigate = useNavigate();
    const {token} = useParams();
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePassword = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/passwordReset/${token}`, {
                password, confirmPassword
            });
            if (res.status === 200) {
                alert("Password Changed Successfully")
                navigate("/login");
            }
        } catch (error) {
            console.log(error.message);
            setError(true)
        }
    }
    return (
        <>
        <Container className='mt-5' style={{width: '30rem'}}>
            <Card className="border m-2 p-4 shadow-lg bg-white rounded">
                <CardBody>
                    <h2>Reset Password</h2>
                {error ? "failed to change password" : ""}
            <Form onSubmit={handlePassword} className='mt-5'>
                <Input type="password" name="newpassword" value={password} placeholder="Enter New Password" onChange={(e) => setPassword(e.target.value)} />
                <Input type="password" name="confirmpassword" value={confirmPassword} placeholder="Conform New Password" onChange={(e) => setConfirmPassword(e.target.value)} className="mt-4"/>
                <Button className='bg-primary mt-4 mb-3 w-100'>Confirm</Button> <br />
            </Form>
                </CardBody>
            </Card>
        </Container>
        </>
    )

}

export default PasswordReset;
