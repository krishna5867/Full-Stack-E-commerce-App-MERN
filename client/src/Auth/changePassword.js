import React, {useState} from "react";
import axios from "axios";
import {Form, Container, Card, CardBody, Button, Input} from 'reactstrap'


const ChangePassword = ()=> {
    const [message, setMessage] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setOldPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");

    const handleUpdatePassword = async (e)=> {
        e.preventDefault();
    try {
        const res = await axios.put(`/changePassword`,{
            email,password,newpassword
        });
        if(res.status === 200){
            setEmail("")
            setOldPassword("")
            setNewPassword("")
            setMessage(true)
    }
    } catch (error) {
        alert("Failed To Change Password")
    }
}
return(
    <>
    <Container className='mt-5' style={{width: '30rem'}}>
        <Card className="border m-2 p-4 shadow-lg bg-white rounded">
            <CardBody>
            <h2>Change Password</h2>
        {message ? <h4 className="text-success mt-4">Password Updated Successfully !</h4> : ""}
    <Form onSubmit={handleUpdatePassword} className='mt-5'>
        <Input type="email" name='email' placeholder="Enter Your Email..." value={email} onChange={(e)=> setEmail(e.target.value)} />
        <Input type="password" name='password' placeholder="Enter old password..." className="mt-4" value={password} onChange={(e)=> setOldPassword(e.target.value)} />
        <Input type="password" name='newpassword' placeholder="Enter new password..." className="mt-4" value={newpassword} onChange={(e)=> setNewPassword(e.target.value)} />
        <Button className='bg-primary mt-4 mb-3 w-100'><b>Update Password</b></Button> <br />
        <p><a href="/profile">Back</a></p>
    </Form>
            </CardBody>
        </Card>
    </Container>
    </>
)

}

export default ChangePassword;