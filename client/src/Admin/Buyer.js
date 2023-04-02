import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container } from 'reactstrap';
import Spinner from '../Component/Loading';


const BuyerDetails = () => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState([]);
    const { id } = useParams();

    const fetchuser = async () => {
        const res = await axios.get(`/getUser/${id}`);
        console.log(res.data);
        if (res.status === 200) {
            setUser(res.data.user)
            setLoading(false)

        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        setLoading(false)
        fetchuser()
    }, [id])

    return (
        <>
            {
                loading ? (<Spinner />) : (<>
                    <Container>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Buyer Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td className='fs-4'>{user?.name}</td>
                                    <td className='fs-4'>${user?.email}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Container>
                </>)}


        </>



    )
}

export default BuyerDetails


